import { createSelector } from '@ngrx/store';
import { UserCredential } from 'firebase/auth';
 
export interface User {
  id: number;
  name: string;
}
 
export interface Book {
  id: number;
  userId: number;
  name: string;
}
 
export interface AppState {
  userCredential: UserCredential;
}
 
export const selectUserCredential = (state: AppState) => state.userCredential;
 
export const userCredentialSelector = createSelector(
  selectUserCredential,
  (selectedUserCredential: UserCredential) => {
    return selectedUserCredential;
  }
);
