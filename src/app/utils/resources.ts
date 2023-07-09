import { UserCredential } from 'firebase/auth';
import { ApartmentBuilding } from './buildings/interfaces';
import {
  CarouselSlides,
  User,
  MenuItem,
  AuthError,
  AuthState,
  Credentials,
  UserState,
  DatabaseError,
  UserDataState,
  HotSpotUser,
} from './interfaces';
import { OperationType } from 'firebase/auth';
import { authReducer, databaseReducer } from '../shared/store/reducer';
import { AuthEffects } from '../shared/store/auth.effects';
import { DatabaseEffects } from '../shared/store/db.effects';

/** Menu items */
export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'dash_home',
    icon: 'home',
    label: 'Dashboard',
    routerLink: '/',
  },
  {
    name: 'about',
    icon: 'info',
    label: 'What Is This?',
    routerLink: '/info',
  },
  {
    name: 'view_listings',
    icon: 'map',
    label: 'View Listings',
    routerLink: '',
  },
  {
    name: 'account',
    icon: 'account_circle',
    label: 'Account',
    routerLink: '/account',
    auth: true,
  },
  {
    name: 'sign_out',
    icon: 'logout',
    label: 'Sign Out',
    auth: true,
  },
];

/** -_- */
export const MONTHS: Record<number, string> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const DEFAULT_EMPTY_USER: User = {
  uid: 'DEF',
  email: 'test@test',
  displayName: 'def',
  emailVerified: false,
};

// Enum with all currently supported sign in types
export enum AuthTypesEnum {
  EMAIL_PASS = 'email_pass',
  // GOOGLE = 'google',
  // others..
}

// Enum of all user warnings supported by UI (i.e. that will display an explicit error message)
export enum WarningsEnum {
  PASSWORD_MATCH = 'password_word',
  EMAIL_TAKEN = 'email_taken',
  UNSUPPORTED_TYPE = 'unsupported_type',
  WEAK_PASSWORD = 'weak_password',
  EMAIL_PASSWORD_INCORRECT = 'email_password_incorrect',
  FIRESTORE_DB_ERROR = 'firestore_db_error',
  OTHER = 'other',
  // others
}

export enum Features {
  Auth = 'Auth',
  // others
}

// Favicon URL
export const FAVICON_URL =
  'https://img.icons8.com/material/50/f9f9f9/fire-element--v1.png';

// Returns whether or not auth API response was error or UserCredential
export function isAuthError(
  obj: AuthError | UserCredential | undefined | null
): obj is AuthError {
  return (obj as AuthError)?.code ? true : false;
}

// Type container all currently supported reducers
export type AppReducers = {
  authReducer: AuthState;
  databaseReducer: UserDataState;
};

export const UNKNOWN_EMAIL_AUTH_SERVER_ERROR = {
  authType: AuthTypesEnum.EMAIL_PASS,
  errorType: WarningsEnum.OTHER,
  code: '500',
  message: 'Unknown server error...',
};

export const EMPTY_CREDENTIAL: Credentials = {
  type: AuthTypesEnum.EMAIL_PASS,
};

export const FIREBASE_AUTH_ERROR_EMAIL_IN_USE =
  'Firebase: Error (auth/email-already-in-use).';

export const APP_REDUCERS = {
  auth: authReducer,
  db: databaseReducer,
};

export const APP_EFFECTS = [AuthEffects, DatabaseEffects];

/** Parses userAuthState from cookies */
export function parseUserAuthState(rawAuthState: string | undefined) {
  return rawAuthState ? (JSON.parse(rawAuthState) as AuthState) : undefined;
}

export function reloadPage() {
  window.location.reload();
}

export function isDatabaseError(
  obj: UserCredential | DatabaseError
): obj is DatabaseError {
  return (obj as DatabaseError).errorType === WarningsEnum.FIRESTORE_DB_ERROR;
}

export const DEFAULT_DATABASE_ERROR: DatabaseError = {
  code: 500,
  message: 'SERVER ERROR - Could not complete database operation.',
  errorType: WarningsEnum.FIRESTORE_DB_ERROR,
};

// Indicates how a user has interacted with a particular resource (listing, comment, etc.)
export enum UserInteractionTypeEnum {
  FAVORITED = 'favorited',
  WATCHING = 'watching',
  VISITED = 'visited',
  LIVED_IN = 'lived_in',
  NONE = 'none',
}

export const MOCK_HOTSPOT_USER: HotSpotUser = {
  userCredential: {} as UserCredential,
  displayName: 'BootyHunter12',
  savedBuildings: [],
  email: 'glc2266@gmail.com',
  dateOfBirth: 'March 10, 2000',
  phone: '732-740-8380',
  address: '99 MacDougal Street',
};
