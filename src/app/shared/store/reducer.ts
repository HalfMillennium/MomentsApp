import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { registerEmail, signInEmail } from './actions';
import { AuthTypesEnum, isAuthError, AppReducers } from '../../utils/resources';
import { FirebaseAuthService } from '../auth/service';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { UserCredential } from 'firebase/auth';
import {AuthError, AuthState} from 'src/app/utils/interfaces';
import { SessionState } from 'src/app/utils/interfaces';
import {Credentials} from '../../utils/interfaces';

const EMPTY_CREDENTIAL: Credentials = {
    type: 'email',
}

function currentUserCredential(email: string|undefined, password: string|undefined) {
    return { ...EMPTY_CREDENTIAL, email, password };
}

const firebaseAuthService = new FirebaseAuthService();

export const metaReducers: MetaReducer<SessionState>[] = isDevMode() ? [] : [];

export const initialState: AuthState = { userCredential: undefined, isAuthenticated: false };

const authReducer = createReducer(
    initialState,
    on(registerEmail, (state, {userEmail, userPassword}) => ({ ...state,
            userCredential: 
                (parseAuthResponse(firebaseAuthService.createUser(
                    AuthTypesEnum.EMAIL_PASS, 
                    currentUserCredential(userEmail, userPassword))))
                })),
    on(signInEmail, (state, {userEmail, userPassword}) => ({ ...state,
        userCredential: 
            (parseAuthResponse(firebaseAuthService.signIn(
                AuthTypesEnum.EMAIL_PASS, 
                currentUserCredential(userEmail, userPassword))))
            })),
  );

async function parseAuthResponse(response: Promise<Observable<UserCredential | AuthError>>): Promise<UserCredential|undefined> {
    let resultCredential: UserCredential|AuthError|undefined;
    await response.then((authResponseObs: Observable<UserCredential|AuthError>) => {
        authResponseObs.pipe(take(1), map((response) => {
            resultCredential = response;
        }));
    })
    if(resultCredential && !isAuthError(resultCredential)) {
        return resultCredential;
    }
    return undefined;
}

export const reducers: ActionReducerMap<AppReducers> = {
    authReducer
}
