import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import {
  registerEmailSuccess,
  registerEmailFailure,
  signInEmailFailure,
  signInEmailSuccess,
  createUserSuccess,
} from './actions';
import { AppReducers } from '../../utils/resources';
import { AuthState, UserDataState } from 'src/app/utils/interfaces';
import { FirebaseAuthService } from '../auth/service';

export const metaReducers: MetaReducer<{}>[] = isDevMode() ? [] : [];

const initialAuthState: AuthState = {};
const initialUserActivityState: UserDataState = {};

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
  }))
);

export const databaseReducer = createReducer(
  initialUserActivityState,
  on(createUserSuccess, (state: UserDataState, { user }) => ({
    ...state,
    user,
  }))
);

export const reducers: ActionReducerMap<AppReducers> = {
  authReducer,
  databaseReducer,
};
