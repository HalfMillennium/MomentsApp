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
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-dialog',
  standalone: true,
  templateUrl: 'auth-dialog.component.html',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuthDialog {
  userAuthForm: FormGroup;
  credential: UserCredential|undefined;
  userEmail: string|undefined;
  userPass: string|undefined;
  // whether this auth dialog is signing a user in or signing one up
  signIn = true;
  readonly firebaseAuthService = new FirebaseAuthService();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: SignUpDialogData,
  ) {
    this.userAuthForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  setValue() {
    this.userEmail = this.userAuthForm.get('email')?.value; // input value retrieved
    this.userPass = this.userAuthForm.get('password')?.value;
  }

  authenticate() {
    if(this.signIn) {
      this.signInUserEmail(`${this.userEmail}`, `${this.userPass}`);
    } else {
      this.registerUserEmail(`${this.userEmail}`, `${this.userPass}`);
    }
  }

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
                      this.router.navigateByUrl('/welcome-confirmation')
                    }
                  })
                })
                .catch((error) => {
                  console.log("Unknown Registration Error:", error);
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
                  console.log("Unknown Sign In Error:", error);
                })
  }

  updateFormType() {
    this.signIn = !this.signIn;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}