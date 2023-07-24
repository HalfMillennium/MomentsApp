import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MetaStores } from '../../utils/interfaces';
import { Features } from '../../utils/resources';

export const userCredentialSelector = (state: MetaStores) =>
  state.auth.userCredential;
export const userAuthErrorSelector = (state: MetaStores) =>
  state.auth.userAuthError;
