// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import {FIREBASE_CONFIG} from './config';
import {Observable, of as observableOf} from 'rxjs';
import {AuthTypesEnum} from '../../utils/resources';
import {AuthError, Credentials} from '../../utils/interfaces';

export class FirebaseAuthService {
    userCredential: UserCredential|undefined|void = undefined;
    readonly getAuth = getAuth;
    readonly createUserWithEmailAndPassword = createUserWithEmailAndPassword;
    // Initialize Firebase
    app = initializeApp(FIREBASE_CONFIG);
    analytics = getAnalytics(this.app);

    async createUser(type: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (type !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({type, code: '400', message: '..Unsupported sign in type..'});
        }
        return createUserWithEmailAndPassword(getAuth(), credentials['email'], credentials['password'])
                            .then((credential) => {
                                return observableOf(credential);
                            })
                            .catch((error) => { 
                                console.log(error);
                                return (error);
                            });
    }

    async signIn(type: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (type !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({type, code: '400', message: '..Unsupported sign in type..'});
        }
        return signInWithEmailAndPassword(getAuth(), credentials['email'], credentials['pass'])
                            .then((credential) => {
                                return observableOf(credential);
                            })
                            .catch((error) => {
                                console.log(error);
                                return observableOf({type, code: '500', message: `${error}`});
                            });
    }
  

}
