import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../utils/interfaces';
import {Features} from '../../utils/resources';

export const authFeature = createFeatureSelector<AuthState>(Features.Auth);

export const userCredentialSelector = createSelector(
    authFeature,
    (state: AuthState) => state.userCredential
);

export const userAuthErrorSelector = createSelector(
    authFeature,
    (state: AuthState) => state.userAuthError
);