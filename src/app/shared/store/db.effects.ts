import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { createUser, createUserSuccess, createUserFailure } from './db.actions';
import { catchError, mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { of as observableOf, Observable, take, from, EMPTY, merge } from 'rxjs';
import { DatabaseError } from '../../utils/interfaces';
import { FirebaseStorageService } from '../database/service';
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
  constructor(
    private actions$: Actions,
    private firebaseStorageService: FirebaseStorageService
  ) {}

  createHotSpotUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap(async ({ user, displayName }) => {
        const result = await this.firebaseStorageService.createHotSpotUser(
          user,
          displayName
        );
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
}
