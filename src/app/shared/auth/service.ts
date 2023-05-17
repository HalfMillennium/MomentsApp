// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import {FIREBASE_CONFIG} from './config';
import {Observable, of as observableOf} from 'rxjs';
import {AuthTypesEnum, WarningsEnum, FIREBASE_AUTH_ERROR_EMAIL_IN_USE} from '../../utils/resources';
import {AuthError, Credentials} from '../../utils/interfaces';

export class FirebaseAuthService {
    userCredential: UserCredential|undefined|void = undefined;
    // Initialize Firebase
    app = initializeApp(FIREBASE_CONFIG);
    //analytics = getAnalytics(this.app);
    auth = getAuth(this.app);

    async createUser(authType: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (authType !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({authType, errorType: WarningsEnum.UNSUPPORTED_TYPE, code: '400', message: '..Unsupported create user type..'});
        }
        return createUserWithEmailAndPassword(this.auth, credentials['email'], credentials['password'])
                            .then((credential) => {
                                return observableOf(credential);
                            })
                            .catch((error: AuthError) => {
                                const isEmailTakenError = (error.message == FIREBASE_AUTH_ERROR_EMAIL_IN_USE);
                                return observableOf({authType, 
                                    errorType: (isEmailTakenError) ? WarningsEnum.EMAIL_TAKEN : WarningsEnum.OTHER,
                                    code: (isEmailTakenError) ? '400' : '500',
                                    message: `${error}`});
                            });
    }

    async signIn(authType: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (authType !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({authType, errorType: WarningsEnum.OTHER, code: '400', message: '..Unsupported sign in type..'});
        }
        return signInWithEmailAndPassword(this.auth, credentials['email'], credentials['pass'])
                            .then((credential) => {
                                return observableOf(credential);
                            })
                            .catch((error) => {
                                return observableOf({authType, errorType: WarningsEnum.OTHER, code: '500', message: `${error}`});
                            });
    }
  

}
