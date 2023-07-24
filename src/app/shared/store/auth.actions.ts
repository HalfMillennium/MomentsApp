import { ActionCreator, createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { User, UserCredential } from 'firebase/auth';
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

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ userCredential: UserCredential }>()
);

export const signInEmailFailure = createAction(
  '[Auth] Register Email Failure',
  props<{ userAuthError: AuthError }>()
);

export const updateUserProfile = createAction(
  '[Auth] Update User Profile',
  props<{ user: User; displayName?: string; photoURL?: string }>()
);

export const updateUserProfileSuccess = createAction(
  '[Auth] Update User Profile Success'
);

export const updateUserCredentialWithCookie = createAction(
  '[Auth] Update User Credential w/ Cookie'
);
