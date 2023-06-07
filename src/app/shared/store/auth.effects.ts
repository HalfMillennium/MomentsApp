import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CreateUserEmailResponse, FirebaseAuthService } from '../auth/service';
import { Injectable } from '@angular/core';
import {
  signInEmail,
  signInEmailFailure,
  signInEmailSuccess,
  registerEmail,
  registerEmailSuccess,
  registerEmailFailure,
  updateUserProfile,
  updateUserProfileSuccess,
} from './auth.actions';
import { catchError, mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { of as observableOf, Observable, take, from, EMPTY, merge } from 'rxjs';
import { AuthState, Credentials, AuthError } from 'src/app/utils/interfaces';
import {
  AuthTypesEnum,
  UNKNOWN_EMAIL_AUTH_SERVER_ERROR,
  isAuthError,
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
          action.userPassword,
          action.displayName
        );
        return result.pipe(
          map((response: CreateUserEmailResponse) => {
            return response;
          })
        );
      }),
      switchMap((response: Observable<CreateUserEmailResponse>) => {
        return response.pipe((result) => result);
      }),
      mergeMap((result: CreateUserEmailResponse) => {
        return observableOf(
          isAuthError(result.response)
            ? registerEmailFailure({ userAuthError: result.response })
            : registerEmailSuccess({
                userCredential: result.response,
                displayName: result.displayName,
              })
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
        console.log(
          'user:',
          (result as UserCredential).user.displayName,
          'provider data:',
          (result as UserCredential).user.providerData
        );
        return observableOf(
          isAuthError(result)
            ? signInEmailFailure({ userAuthError: result })
            : signInEmailSuccess({ userCredential: result })
        );
      })
    )
  );

  // Adds user's chosen displayName to user profile upon registration
  initUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerEmailSuccess),
      switchMap((action) =>
        this.firebaseAuthService.updateUserProfile(
          action.userCredential.user,
          action.displayName
        )
      ),
      mergeMap(() => {
        console.log('success?');
        return observableOf(updateUserProfileSuccess());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  async createUserService(
    userEmail: string,
    userPassword: string,
    displayName: string
  ): Promise<Observable<CreateUserEmailResponse>> {
    return await this.firebaseAuthService
      .createUser(AuthTypesEnum.EMAIL_PASS, {
        type: AuthTypesEnum.EMAIL_PASS,
        userEmail,
        userPassword,
        displayName,
      })
      .then((result) => {
        return result.pipe(
          map((response) => {
            return { response, displayName };
          })
        );
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
