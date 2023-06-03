import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirebaseAuthService } from '../auth/service';
import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import {
  signInEmail,
  signInEmailFailure,
  signInEmailSuccess,
  registerEmail,
  registerEmailSuccess,
  registerEmailFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
} from './actions';
import { catchError, mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { of as observableOf, Observable, take, from, EMPTY, merge } from 'rxjs';
import { DatabaseError } from '../../utils/interfaces';
import { DEFAULT_DATABASE_ERROR } from '../../utils/resources';
import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '../common/config/firebase';
import { isDatabaseError } from 'src/app/utils/resources';
import { UserCredential } from 'firebase/auth';

interface CreateUserResponse {
  response: UserCredential | DatabaseError;
  displayName: string;
}

@Injectable()
export class DatabaseEffects {
  app = initializeApp(FIREBASE_CONFIG);

  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(this.app);

  constructor(private actions$: Actions) {}

  createHotSpotUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap(async ({ user, displayName }) => {
        const result = await this.createHotSpotUserService(user, displayName);
        return result.pipe(
          map((response) => {
            return observableOf({ response, displayName });
          })
        );
      }),
      switchMap((response: Observable<Observable<CreateUserResponse>>) => {
        return response.pipe((response) => response);
      }),
      switchMap((response: Observable<CreateUserResponse>) => {
        return response.pipe((result) => result);
      }),
      mergeMap((result: CreateUserResponse) => {
        if (isDatabaseError(result.response)) {
          return observableOf(createUserFailure({ error: result.response }));
        }
        return observableOf(
          createUserSuccess({
            user: {
              userCredential: result.response,
              displayName: result.displayName,
            },
          })
        );
      })
    )
  );

  async createHotSpotUserService(
    user: UserCredential,
    displayName: string
  ): Promise<Observable<UserCredential | DatabaseError>> {
    try {
      const docRef = await addDoc(collection(this.db, 'users'), {
        user,
        displayName,
      });
      console.log('Document written with ID: ', docRef.id);
      return observableOf(user);
    } catch (exception) {
      console.error('Error adding document: ', exception);
      return observableOf(DEFAULT_DATABASE_ERROR);
    }
  }
}
