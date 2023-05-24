import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer,
  createReducerFactory,
} from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import {
  registerEmailSuccess,
  registerEmailFailure,
  signInEmailFailure,
  signInEmailSuccess,
  updateUserBasics,
} from './actions';
import { AppReducers } from '../../utils/resources';
import { AuthState, UserState } from 'src/app/utils/interfaces';
import { FirebaseAuthService } from '../auth/service';

export const metaReducers: MetaReducer<{}>[] = isDevMode() ? [] : [];

const initialAuthState: AuthState = {};
const initialUserState: UserState = {};

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

export const userReducer = createReducer(
  initialUserState,
  on(updateUserBasics, (state: UserState, { user, displayName }) => {
    const firebaseAuthService = new FirebaseAuthService();
    firebaseAuthService.updateUserBasics(displayName);
    return { displayName };
  })
);

export const reducers: ActionReducerMap<AppReducers> = {
  authReducer,
  userReducer,
};
