import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { registerEmail, registerEmailSuccess, registerEmailFailure, signInEmailFailure, updateUserBasics, signInEmailSuccess } from './actions';
import { AuthTypesEnum, isAuthError, AppReducers } from '../../utils/resources';
import { FirebaseAuthService } from '../auth/service';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Auth, UserCredential } from 'firebase/auth';
import {AuthError, AuthState} from 'src/app/utils/interfaces';
import {Credentials, UserState} from '../../utils/interfaces';
import { Action } from '@ngrx/store';

export const metaReducers: MetaReducer<{}>[] = isDevMode() ? [] : [];

const initialAuthState: AuthState = {};
const initialUserState: UserState = {};

export const authReducer = createReducer(
    initialAuthState,
    on(registerEmailSuccess, (state: AuthState, {userCredential}) => ({...state, userCredential})),
    on(registerEmailFailure, (state: AuthState, {userAuthError}) => ({...state, userAuthError})),
    on(signInEmailSuccess, (state: AuthState, {userCredential}) => ({...state, userCredential})),
    on(signInEmailFailure, (state: AuthState, {userAuthError}) => ({...state, userAuthError})),
  );

export const userReducer = createReducer(
  initialUserState,
  on(updateUserBasics, (state: UserState, {userCredential, displayName}) => {
    const firebaseAuthService = new FirebaseAuthService();
    firebaseAuthService.updateUserBasics(userCredential.user, displayName);
    return {...state, displayName};
  })
)

export const reducers: ActionReducerMap<AppReducers> = {
    authReducer,
    userReducer
}
