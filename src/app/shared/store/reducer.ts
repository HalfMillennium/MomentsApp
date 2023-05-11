import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { registerEmail, registerEmailSuccess, signInEmail } from './actions';
import { AuthTypesEnum, isAuthError, AppReducers } from '../../utils/resources';
import { FirebaseAuthService } from '../auth/service';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Auth, UserCredential } from 'firebase/auth';
import {AuthError, AuthState} from 'src/app/utils/interfaces';
import { SessionState } from 'src/app/utils/interfaces';
import {Credentials} from '../../utils/interfaces';

const firebaseAuthService = new FirebaseAuthService();

export const metaReducers: MetaReducer<SessionState>[] = isDevMode() ? [] : [];

const initialState: AuthState = {};

const authReducer = createReducer(
    initialState,
    on(registerEmailSuccess, ((state: AuthState, {userCredential}) => { return { ...state, userCredential }; })),
  );

export const reducers: ActionReducerMap<AppReducers> = {
    authReducer
}
