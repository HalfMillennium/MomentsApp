import { ActionCreator, createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { UserCredential } from 'firebase/auth';
import { HotSpotUser, DatabaseError } from 'src/app/utils/interfaces';

export const createUser = createAction(
  '[Firestore] Create User',
  props<{ user: UserCredential; displayName: string }>()
);

export const createUserSuccess = createAction(
  '[Firestore] Create User Success',
  props<{ user: HotSpotUser }>()
);

export const createUserFailure = createAction(
  '[Firestore] Create User Failure',
  props<{ error: DatabaseError }>()
);
