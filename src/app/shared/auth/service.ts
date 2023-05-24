import { initializeApp } from 'firebase/app';
import {
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
  User,
} from 'firebase/auth';
import { FIREBASE_CONFIG } from '../common/config/firebase';
import { Observable, of as observableOf } from 'rxjs';
import {
  AuthTypesEnum,
  WarningsEnum,
  FIREBASE_AUTH_ERROR_EMAIL_IN_USE,
} from '../../utils/resources';
import { AuthError, Credentials } from '../../utils/interfaces';
import { FirebaseApp } from '@angular/fire/app';

export class FirebaseAuthService {
  userCredential: UserCredential | undefined | void = undefined;
  // Initialize Firebase
  auth = getAuth(initializeApp(FIREBASE_CONFIG));

  createWarning(
    login: boolean,
    e: any
  ): { errorType: WarningsEnum; code: string; message: string } {
    const error = `${e}`;
    if (!login) {
      if (error.includes('email-already-in-use')) {
        return {
          errorType: WarningsEnum.EMAIL_TAKEN,
          code: '400',
          message: 'Email address already in use.',
        };
      }
      if (error.includes('weak-password')) {
        return {
          errorType: WarningsEnum.WEAK_PASSWORD,
          code: '400',
          message: 'Password must be at least 6 characters.',
        };
      }
    }
    return {
      errorType: WarningsEnum.OTHER,
      code: '500',
      message: 'Unknown server error. Try again later.',
    };
  }

  async createUser(
    authType: AuthTypesEnum,
    credentials: Credentials
  ): Promise<Observable<UserCredential | AuthError>> {
    if (authType !== AuthTypesEnum.EMAIL_PASS) {
      return observableOf({
        authType,
        errorType: WarningsEnum.UNSUPPORTED_TYPE,
        code: '400',
        message: '..Unsupported create user type..',
      });
    }
    return createUserWithEmailAndPassword(
      this.auth,
      credentials['userEmail'],
      credentials['userPassword']
    )
      .then((credential) => {
        console.log('userBasicsUpdate, userName:', credentials['displayName']);
        this.updateUserBasics(credentials['displayName']);
        return observableOf(credential);
      })
      .catch((error) => {
        return observableOf({
          ...this.createWarning(false, error),
          authType: AuthTypesEnum.EMAIL_PASS,
        });
      });
  }

  async signIn(
    authType: AuthTypesEnum,
    credentials: Credentials
  ): Promise<Observable<UserCredential | AuthError>> {
    if (authType !== AuthTypesEnum.EMAIL_PASS) {
      return observableOf({
        authType,
        errorType: WarningsEnum.OTHER,
        code: '400',
        message: '..Unsupported sign in type..',
      });
    }
    return signInWithEmailAndPassword(
      this.auth,
      credentials['userEmail'],
      credentials['userPassword']
    )
      .then((credential) => {
        return observableOf(credential);
      })
      .catch((error) => {
        return observableOf({
          ...this.createWarning(true, error),
          authType: AuthTypesEnum.EMAIL_PASS,
        });
      });
  }

  async signOut(): Promise<string | undefined> {
    return signOut(this.auth)
      .then(() => {
        return undefined;
      })
      .catch((error) => {
        const result = `SERVER ERROR: ${error}`;
        console.log(result);
        return result;
      });
  }

  /** A "UserBasic" is defined here as being a user's basic attributes such as email and username */
  async updateUserBasics(displayName?: string, photoURL?: string) {
    const update = await updateProfile(getAuth().currentUser!, {
      displayName,
      photoURL,
    });
    console.log('currentUser:');
    getAuth().currentUser?.reload();
  }
}
