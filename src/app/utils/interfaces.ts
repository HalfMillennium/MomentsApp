import { UserCredential } from 'firebase/auth';
import { AuthTypesEnum, WarningsEnum } from './resources';
import { Action, ActionReducer } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { BuildingAmenityTypeEnum } from './buildings/resources';
import { Firestore } from 'firebase/firestore';
import { ApartmentBuilding } from './buildings/interfaces';

/** Interface for menu items */
export interface MenuItem {
  name: string;
  icon: string;
  label: string;
  routerLink?: string;
  auth?: boolean; // this is set when the menu items presence depends on user authentication state
}

export interface BuildingInfo {
  id?: string | null;
  title?: string | null;
  desc?: string | null;
  images?: string[] | null;
  alt?: string | null;
  available_units?: number;
  est?: Date;
  amenities: BuildingAmenityTypeEnum[];
}

export interface CarouselSlides {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  routerLink: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  emailVerified: boolean;
}

export interface AuthError {
  authType: AuthTypesEnum;
  errorType: WarningsEnum;
  code: string;
  message: string;
}

export interface Credentials {
  type: AuthTypesEnum;
  [x: string]: any;
}

export interface SignUpDialogData {
  displayName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confPassword: FormControl<string>;
}

export interface RegisterRequest {
  type: string;
  credentials: Credentials;
}

export interface EmailAuthCredentials extends Credentials {
  userEmail: string;
  userPassword: string;
}

export interface AuthState {
  userCredential?: UserCredential | undefined;
  userAuthError?: AuthError | undefined;
}

export interface UserState {
  displayName?: string;
  photoURL?: string;
}

export declare interface MetaStores {
  auth: AuthState;
  db: UserDataState;
  // other stores to follow..
}

export interface Image {
  url: string;
  alt: string;
}

export interface DatabaseError {
  code: number;
  message: string;
  db?: Firestore;
  collection?: string;
  errorType: WarningsEnum.FIRESTORE_DB_ERROR;
}

export interface HotSpotUser {
  userCredential: UserCredential;
  displayName?: string;
  savedBuildings?: ApartmentBuilding[];
}

export interface DatabaseState {
  user?: HotSpotUser;
}

export interface UserDataState extends DatabaseState {
  // other user activity stuff would go here,
  // e.g. Liked Buildings --> buildings a user has liked, but hasn't visited for an extended period of time
  shouldReloadUser?: boolean;
}

export interface BuildingDetailChunk {
  plainText: string;
  image: Image;
  title: string;
  direction: string;
  googleIcon?: string;
  angularMatIcon?: string;
  amenities: BuildingAmenityTypeEnum[];
}
