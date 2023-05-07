import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { register, signIn } from './actions';
import { AuthTypesEnum, isAuthError } from 'src/app/utils/resources';
import { FirebaseAuthService } from '../auth/service';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Auth, User, UserCredential } from 'firebase/auth';
import {AuthError} from 'src/app/utils/interfaces';
import { SessionState } from 'src/app/utils/interfaces';
import {Reducer, Credentials} from '../../utils/interfaces';
import { Action } from '@ngrx/store';
import { OnReducer } from '@ngrx/store/src/reducer_creator';
import {of as observableOf} from 'rxjs';

const EMPTY_CREDENTIAL: Credentials = {
    type: 'email',
}

function currentUserCredential(email: string|undefined, password: string|undefined) {
    return { ...EMPTY_CREDENTIAL, email, password };
}

const firebaseAuthService = new FirebaseAuthService();

export const metaReducers: MetaReducer<SessionState>[] = isDevMode() ? [] : [];

export const initialState: SessionState = { userCredential: undefined, userEmail: '', userPassword: '' };

const authReducer = createReducer(
    initialState,
    on(register(AuthTypesEnum.EMAIL_PASS), state => ({ ...state,
            userCredential: 
                (parseAuthResponse(firebaseAuthService.createUser(
                    AuthTypesEnum.EMAIL_PASS, 
                    currentUserCredential(state.userEmail, state.userPassword))))
                })),
    on(signIn(AuthTypesEnum.EMAIL_PASS), state => ({ ...state,
        userCredential: 
            (parseAuthResponse(firebaseAuthService.signIn(
                AuthTypesEnum.EMAIL_PASS, 
                currentUserCredential(state.userEmail, state.userPassword))))
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
/*
export const REDUCERS: ActionReducerMap<SessionState> = {
    
}*/
