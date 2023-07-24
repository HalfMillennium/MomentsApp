import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import {
  registerEmailSuccess,
  registerEmailFailure,
  signInEmailFailure,
  signInSuccess,
  updateUserProfileSuccess,
} from './auth.actions';
import { createUserSuccess } from './db.actions';

import { AppReducers } from '../../utils/resources';
import { MetaStores } from 'src/app/utils/interfaces';
import { FirebaseAuthService } from '../auth/service';

export const metaReducers: MetaReducer<{}>[] = isDevMode() ? [] : [];

const initialState: MetaStores = {
  auth: {},
  db: {},
};

export const appReducers = createReducer(
  initialState,
  on(registerEmailSuccess, (state: MetaStores, { userCredential }) => ({
    ...state,
    auth: {
      userCredential,
    },
  })),
  on(registerEmailFailure, (state: MetaStores, { userAuthError }) => ({
    ...state,
    auth: {
      userAuthError,
    },
  })),
  on(signInSuccess, (state: MetaStores, { userCredential }) => ({
    ...state,
    auth: {
      userCredential,
    },
  })),
  on(signInEmailFailure, (state: MetaStores, { userAuthError }) => ({
    ...state,
    auth: {
      userAuthError,
    },
  }))
);

export const reducers: ActionReducerMap<AppReducers> = {
  appReducers,
};
