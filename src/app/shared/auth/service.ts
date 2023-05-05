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
    
    private async createUserWithEmailAndPasswordInternal(email: string, password: string) {
        const auth = getAuth(this.app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Could not authenticate user with email '${email}': ${error}:${errorMessage}`);
        });
    }

    async createUser(type: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (type !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({type, code: '400', message: '..Unsupported sign in type..'});
        }
        return await this.createUserWithEmailAndPasswordInternal(credentials['email'], credentials['password'])
                            .then((credential) => {
                                //this.userCredential = credential;
                                return observableOf(credential);
                            })
                            .catch((error) => { 
                                console.log(error);
                                return (error);
                            });
    }

    private async signInWithEmailAndPasswordInternal(email: string, password: string): Promise<UserCredential> {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    async signIn(type: AuthTypesEnum, credentials: Credentials): Promise<Observable<UserCredential | AuthError>> {
        if (type !== AuthTypesEnum.EMAIL_PASS) {
            return observableOf({type, code: '400', message: '..Unsupported sign in type..'});
        }
        await this.signInWithEmailAndPasswordInternal(credentials['email'], credentials['pass'])
                            .then((credential) => {
                                this.userCredential = credential;
                            })
                            .catch((error) => {
                                throw(error);
                            });
        if(!this.userCredential) {
            return observableOf({type, code: '500', message: '..UNKNOWN SIGN IN ERROR..'})
        }
        return observableOf(this.userCredential);
    }
  

}
