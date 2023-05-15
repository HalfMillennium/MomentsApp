import {Actions, createEffect, ofType} from '@ngrx/effects';
import { FirebaseAuthService } from '../auth/service';
import {Injectable} from '@angular/core';
import {registerEmail, registerEmailSuccess, registerEmailFailure} from './actions';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of, Observable, take, EMPTY} from 'rxjs';
import { AuthState, Credentials, AuthError } from 'src/app/utils/interfaces';
import { AuthTypesEnum, UNKNOWN_EMAIL_AUTH_SERVER_ERROR, isAuthError, TEST_USER_CREDENTIAL } from 'src/app/utils/resources';
import {UserCredential} from 'firebase/auth';

@Injectable()
export class AuthEffects {
    /*userCredential$ = createEffect(() =>
            this.actions$.pipe(
                ofType(registerEmail),
                switchMap((action) => this.createUserService(action.userEmail, action.userPassword)
                    .then((authState: AuthState) => {
                        const credential = authState.userCredential;
                        if(!isAuthError(credential)) {
                            return registerEmailSuccess({
                                userCredential: credential!
                            });
                        } else {
                            return registerEmailFailure({
                                error: credential
                            });
                        }
                    })
                    .catch((error) => 
                    {
                        console.log('auth error:',error);
                        return registerEmailFailure({
                        error: UNKNOWN_EMAIL_AUTH_SERVER_ERROR
                    });})
                ))
            );*/

    userCredential$ = createEffect(() => this.actions$.pipe(
        ofType(registerEmail),
        exhaustMap((action) => this.createUserService(action.userEmail, action.userPassword)
            .pipe(
            map((authState: AuthState) => {
                const credential = authState.userCredential;
                if(!isAuthError(credential)) {
                    return registerEmailSuccess({
                        userCredential: credential!
                    });
                } else {
                    return registerEmailFailure({
                        error: credential
                    });
                }
            }),
            catchError(() => EMPTY))
        )));

    constructor(
        private actions$: Actions,
        private firebaseAuthService: FirebaseAuthService
    ) {}

    generateEmailCredential(userEmail: string, userPassword: string) {
        const emailCredential: Credentials = {
            type: AuthTypesEnum.EMAIL_PASS,
            userEmail,
            userPassword
        }
        return emailCredential;
    }

    getBlankCredential(email: string|undefined, password: string|undefined) {
        return ;
    }

    createUserService(userEmail: string, userPassword: string): Observable<AuthState> {
        /*const authResult = await (this.parseAuthResponse(this.firebaseAuthService.createUser(
            AuthTypesEnum.EMAIL_PASS, { 
                type: AuthTypesEnum.EMAIL_PASS, 
                userEmail, 
                userPassword })));
        return {userCredential: authResult, 
            userAuthError: (isAuthError(authResult)) ? authResult : undefined }*/
        return of({userCredential: TEST_USER_CREDENTIAL as UserCredential});
    }

    async parseAuthResponse(response: Promise<Observable<UserCredential | AuthError>>): Promise<UserCredential|AuthError> {
        let resultCredential: UserCredential|AuthError|undefined;
        await response.then((authResponseObs: Observable<UserCredential|AuthError>) => {
            authResponseObs.pipe(take(1), map((response) => {
                resultCredential = response;
            }));
        })
        return resultCredential ?? UNKNOWN_EMAIL_AUTH_SERVER_ERROR;
    }
}