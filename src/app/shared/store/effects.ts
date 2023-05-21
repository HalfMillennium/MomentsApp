import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirebaseAuthService } from '../auth/service';
import { Injectable } from '@angular/core';
import {
  signInEmail,
  signInEmailFailure,
  signInEmailSuccess,
  registerEmail,
  registerEmailSuccess,
  registerEmailFailure,
} from './actions';
import { catchError, mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { of as observableOf, Observable, take, from, EMPTY, merge } from 'rxjs';
import { AuthState, Credentials, AuthError } from 'src/app/utils/interfaces';
import {
  AuthTypesEnum,
  UNKNOWN_EMAIL_AUTH_SERVER_ERROR,
  isAuthError,
  TEST_USER_CREDENTIAL,
} from 'src/app/utils/resources';
import { User, UserCredential } from 'firebase/auth';

@Injectable()
export class AuthEffects {
  createUserEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerEmail),
      switchMap(async (action) => {
        const result = await this.createUserService(
          action.userEmail,
          action.userPassword
        );
        return result.pipe(
          map((response: UserCredential | AuthError) => {
            return response;
          })
        );
      }),
      switchMap((response: Observable<UserCredential | AuthError>) => {
        return response.pipe((result) => result);
      }),
      mergeMap((result: UserCredential | AuthError) => {
        return observableOf(
          isAuthError(result)
            ? registerEmailFailure({ userAuthError: result })
            : registerEmailSuccess({ userCredential: result })
        );
      })
    )
  );

  signInUserEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInEmail),
      switchMap(async (action) => {
        const result = await this.signInUserService(
          action.userEmail,
          action.userPassword
        );
        return result.pipe(
          map((response: UserCredential | AuthError) => {
            return response;
          })
        );
      }),
      switchMap((response: Observable<UserCredential | AuthError>) => {
        return response.pipe((result) => result);
      }),
      mergeMap((result: UserCredential | AuthError) => {
        return observableOf(
          isAuthError(result)
            ? signInEmailFailure({ userAuthError: result })
            : signInEmailSuccess({ userCredential: result })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  async createUserService(
    userEmail: string,
    userPassword: string
  ): Promise<Observable<UserCredential | AuthError>> {
    return await this.firebaseAuthService
      .createUser(AuthTypesEnum.EMAIL_PASS, {
        type: AuthTypesEnum.EMAIL_PASS,
        userEmail,
        userPassword,
      })
      .then((result) => {
        return result;
      });
  }

  async signInUserService(
    userEmail: string,
    userPassword: string
  ): Promise<Observable<UserCredential | AuthError>> {
    return await this.firebaseAuthService
      .signIn(AuthTypesEnum.EMAIL_PASS, {
        type: AuthTypesEnum.EMAIL_PASS,
        userEmail,
        userPassword,
      })
      .then((result) => {
        return result;
      });
  }
}
