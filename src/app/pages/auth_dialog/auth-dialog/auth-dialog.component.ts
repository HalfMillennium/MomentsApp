import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';
import {SignUpDialogData} from '../../../utils/interfaces';
import { FirebaseAuthService } from 'src/app/shared/auth/service';
import { AuthTypesEnum } from 'src/app/utils/resources';
import { Credentials, AuthError } from '../../../utils/interfaces';
import {UserCredential } from 'firebase/auth';
import {take} from 'rxjs/operators';

@Component({
  selector: 'auth-dialog',
  standalone: true,
  templateUrl: 'auth-dialog.component.html',
  imports: [MaterialModule, CommonModule]
})
export class AuthDialog {
  credential: UserCredential|undefined;
  readonly firebaseAuthService = new FirebaseAuthService();

  constructor(public dialogRef: MatDialogRef<AuthDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SignUpDialogData,
  ) {}

  private isAuthError(obj: UserCredential|AuthError): obj is AuthError {
    return ((obj as AuthError)?.code) ? true : false;
  }

  registerUserEmail(email: string, password: string) {
    const credentials: Credentials = {
      type: AuthTypesEnum.EMAIL_PASS,
      'email': email,
      'password': password
    };
    this.firebaseAuthService.createUser(AuthTypesEnum.EMAIL_PASS, credentials)
                .then((credential) => {
                  credential.pipe(take(1)).subscribe((result) => {
                    if(this.isAuthError(result)) {
                      console.log("Auth Error:",result);
                    } else {
                      this.credential = result;
                    }
                  })
                })
                .catch((error) => {
                  console.log("Unknown Auth Error:",error);
                })
  }

  signInUserEmail(email: string, password: string) {
    const credentials: Credentials = {
      type: AuthTypesEnum.EMAIL_PASS,
      'email': email,
      'password': password
    };
    this.firebaseAuthService.signIn(AuthTypesEnum.EMAIL_PASS, credentials)
                .then((credential) => {
                  credential.pipe(take(1)).subscribe((result) => {
                    if(this.isAuthError(result)) {
                      console.log("Auth Error:",result);
                    } else {
                      this.credential = result;
                    }
                  })
                })
                .catch((error) => {
                  
                })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}