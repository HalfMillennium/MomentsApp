import { ActionCreator, createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { Auth, UserCredential } from 'firebase/auth';
import { AuthError } from 'src/app/utils/interfaces';

/** Action to register user from auth dialog */
export const registerEmail = createAction(
  '[Auth Dialog Component] Register',
  props<{ userEmail: string; userPassword: string; displayName: string }>()
);
export const registerEmailSuccess = createAction(
  '[Auth Dialog Component] Register Email Success',
  props<{
    userCredential: UserCredential;
    displayName?: string;
    photoURL?: string;
  }>()
);

export const registerEmailFailure = createAction(
  '[Auth] Register Email Failure',
  props<{ userAuthError: AuthError }>()
);

/** Action to sign in user from auth dialog */
export const signInEmail = createAction(
  '[Auth] Sign In',
  props<{ userEmail: string; userPassword: string }>()
);

export const signInEmailSuccess = createAction(
  '[Auth] Register Email Success',
  props<{ userCredential: UserCredential }>()
);

export const signInEmailFailure = createAction(
  '[Auth] Register Email Failure',
  props<{ userAuthError: AuthError }>()
);
