import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import {
  registerEmailSuccess,
  registerEmailFailure,
  signInEmailFailure,
  signInEmailSuccess,
  signOutAction,
} from './actions';
import { AuthTypesEnum, isAuthError, AppReducers } from '../../utils/resources';
import { FirebaseAuthService } from '../auth/service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth, UserCredential, signOut } from 'firebase/auth';
import { AuthError, AuthState } from 'src/app/utils/interfaces';
import { Credentials, UserState } from '../../utils/interfaces';
import { Action } from '@ngrx/store';

export const metaReducers: MetaReducer<{}>[] = isDevMode() ? [] : [];

const initialAuthState: AuthState = {};

export const authReducer = createReducer(
  initialAuthState,
  on(registerEmailSuccess, (state: AuthState, { userCredential }) => ({
    ...state,
    userCredential,
  })),
  on(registerEmailFailure, (state: AuthState, { userAuthError }) => ({
    ...state,
    userAuthError,
  })),
  on(signInEmailSuccess, (state: AuthState, { userCredential }) => ({
    ...state,
    userCredential,
  })),
  on(signInEmailFailure, (state: AuthState, { userAuthError }) => ({
    ...state,
    userAuthError,
  })),
  on(signOutAction, () => {
    return {};
  })
);

export const reducers: ActionReducerMap<AppReducers> = {
  authReducer,
};
