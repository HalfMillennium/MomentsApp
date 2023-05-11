import { ActionCreator, createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { UserCredential } from 'firebase/auth';
import { AuthError } from 'src/app/utils/interfaces';

/** Action to register user from auth dialog */
export const registerEmail = createAction(
    '[Auth Dialog Component] Register',
    props<{userEmail: string; userPassword: string;}>(),
)
export const registerEmailSuccess = createAction('[Auth Dialog Component] Register Email Success', props<{userCredential: UserCredential}>());
export const registerEmailFailure = createAction('[Auth Dialog Component] Register Email Failure', props<{error: AuthError}>());

/** Action to sign in user from auth dialog */
export const signInEmail = createAction(
    '[Auth Dialog Component] Sign In',
    props<{userEmail: string; userPassword: string;}>(),
)