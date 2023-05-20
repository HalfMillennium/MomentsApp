import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserCredential, User } from "firebase/auth";
import {FIREBASE_CONFIG} from './config';
import {Observable, of as observableOf} from 'rxjs';
import {AuthTypesEnum, WarningsEnum, FIREBASE_AUTH_ERROR_EMAIL_IN_USE} from '../../utils/resources';
import {AuthError, Credentials} from '../../utils/interfaces';

export class FirebaseAuthService {
    userCredential: UserCredential|undefined|void = undefined;
    // Initialize Firebase
    app = initializeApp(FIREBASE_CONFIG);
    auth = getAuth(this.app);

    createWarning(e: any): { errorType: WarningsEnum, code: string, message: string} {
        const error = `${e}`;
        if(error.includes('email-already-in-use')) {
            return { errorType: WarningsEnum.EMAIL_TAKEN, code: '400', message: 'Email address already in use.'}
        }
        if(error.includes('weak-password')) {
            return { errorType: WarningsEnum.WEAK_PASSWORD, code: '400', message: 'Password must be at least 6 characters.'}
        }
        return { errorType: WarningsEnum.OTHER, code: '500', message: 'Unknown server error. Try again later.' };
    }

    async createUser(authType: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (authType !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({authType, errorType: WarningsEnum.UNSUPPORTED_TYPE, code: '400', message: '..Unsupported create user type..'});
        }
        return createUserWithEmailAndPassword(this.auth, credentials['userEmail'], credentials['userPassword'])
                            .then((credential) => {
                                return observableOf(credential);
                            })
                            .catch((error) => {
                                return observableOf({
                                    ...this.createWarning(error),
                                    authType: AuthTypesEnum.EMAIL_PASS,
                                })
                            });
    }

    async signIn(authType: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (authType !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({authType, errorType: WarningsEnum.OTHER, code: '400', message: '..Unsupported sign in type..'});
        }
        return signInWithEmailAndPassword(this.auth, credentials['email'], credentials['pass'])
                            .then((credential) => {
                                return observableOf(credential);
                            });
    }
  
    /** A "UserBasic" is defined here as being a user's basic attributes such as email and username */
    async updateUserBasics(user: User, displayName?: string, photoURL?: string) {
        updateProfile(user, {
            displayName,
            photoURL
        })
    }
}
