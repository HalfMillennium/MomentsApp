import {Actions, createEffect, ofType} from '@ngrx/effects';
import { FirebaseAuthService } from '../auth/service';
import {Injectable} from '@angular/core';
import {registerEmail, registerEmailSuccess, registerEmailFailure} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, Observable, take} from 'rxjs';
import { AuthState, Credentials, AuthError } from 'src/app/utils/interfaces';
import { AuthTypesEnum, UNKNOWN_EMAIL_AUTH_SERVER_ERROR, EMPTY_CREDENTIAL, isAuthError, WarningsEnum } from 'src/app/utils/resources';
import {UserCredential} from 'firebase/auth';

@Injectable()
export class AuthEffects {
    userCredential$ = createEffect(() =>
            this.actions$.pipe(
                ofType(registerEmail),
                switchMap(async (action) => await this.createUserService(action.userEmail, action.userPassword)
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
                    .catch(async () => registerEmailFailure({
                        error: UNKNOWN_EMAIL_AUTH_SERVER_ERROR
                    }))
                ))
            );

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

    async createUserService(userEmail: string, userPassword: string): Promise<AuthState> {
        const authResult = await (this.parseAuthResponse(this.firebaseAuthService.createUser(
            AuthTypesEnum.EMAIL_PASS, { 
                type: AuthTypesEnum.EMAIL_PASS, 
                userEmail, 
                userPassword })));
        return {userCredential: authResult, 
            userAuthError: (isAuthError(authResult)) ? authResult : undefined }
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