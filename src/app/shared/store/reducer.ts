import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { registerEmail, registerEmailSuccess, registerEmailFailure, signInEmail } from './actions';
import { AuthTypesEnum, isAuthError, AppReducers } from '../../utils/resources';
import { FirebaseAuthService } from '../auth/service';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Auth, UserCredential } from 'firebase/auth';
import {AuthError, AuthState} from 'src/app/utils/interfaces';
import {Credentials} from '../../utils/interfaces';
import { Action } from '@ngrx/store';
export const metaReducers: MetaReducer<{}>[] = isDevMode() ? [] : [];

const initialState: AuthState = {};

export const authReducer = createReducer(
    initialState,
    on(registerEmailSuccess, (state: AuthState, {userCredential}) => ({...state, userCredential})),
    on(registerEmailFailure, (state: AuthState, {error}) => ({...state, error})),
  );

export const reducers: ActionReducerMap<AppReducers> = {
    authReducer
}
