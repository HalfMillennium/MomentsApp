import { ActionCreator, createAction } from '@ngrx/store';
import { props } from '@ngrx/store';


/** Action to register user from auth dialog */
export const register = createAction(
    '[Auth Dialog Component] Register',
    props<{userEmail: string; userPassword: string;}>(),
)

/** Action to sign in user from auth dialog */
export const signIn = createAction(
    '[Auth Dialog Component] Sign In',
    props<{userEmail: string; userPassword: string;}>(),
)