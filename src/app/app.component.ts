import { Component } from '@angular/core';
import { MenuItem } from './utils/interfaces';
import {MENU_ITEMS} from './utils/resources';
import {FirebaseAuthService} from './shared/auth/service';
import { AuthTypesEnum } from './utils/resources';
import { Credentials, AuthError } from './utils/interfaces';
import {take} from 'rxjs/operators';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moments';
  readonly MENU_ITEMS = MENU_ITEMS;
  userAuthenticated = false;
  userCredential: UserCredential|undefined = undefined;
  private readonly firebaseAuthService: FirebaseAuthService = new FirebaseAuthService();

  isAuthError(obj: UserCredential|AuthError): obj is AuthError {
    return ((obj as AuthError).code) ? true : false;
  }

  async signInUserEmail(email: string, password: string) {
    const credentials: Credentials = {type: AuthTypesEnum.EMAIL_PASS, 
                                'email': email, 
                                'password': password};
    const result = await this.firebaseAuthService.signIn(AuthTypesEnum.EMAIL_PASS, credentials);
    result.pipe(take(1)).subscribe((response) => {
      if(this.isAuthError(response)) {
        console.log(`AuthError { type: ${response.type}, code: ${response.code}, message: ${response.message} }`);
      } else {
        this.userCredential = response;
        console.log(`User successfully signedIn! CREDENTIAL: ${this.userCredential}`);
      }
    })
  }

  async registerUserEmail(email: string, password: string) {
    const credentials: Credentials = {type: AuthTypesEnum.EMAIL_PASS, 
      'email': email, 
      'password': password};
    const result = await this.firebaseAuthService.createUser(AuthTypesEnum.EMAIL_PASS, credentials);
    result.pipe(take(1)).subscribe((response) => {
      if(this.isAuthError(response)) {
        console.log(`AuthError { type: ${response.type}, code: ${response.code}, message: ${response.message} }`);
      } else {
        this.userCredential = response;
        console.log(`User successfully created! CREDENTIAL: ${this.userCredential}`);
      }
    })
  }
}
