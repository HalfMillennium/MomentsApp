import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../utils/interfaces';
import {Features} from '../../utils/resources';

export const authFeature = createFeatureSelector(Features.Auth);

const selector = (selectorFn: <T>(state: AuthState) => T) => createSelector(authFeature, selectorFn);

const books = createSelector(bookState, state => state.books);
const authors = createSelector(authorsState, state => state.authors);