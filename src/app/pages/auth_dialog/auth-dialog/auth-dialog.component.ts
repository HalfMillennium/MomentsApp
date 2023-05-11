import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';
import {SignUpDialogData} from '../../../utils/interfaces';
import { FirebaseAuthService } from 'src/app/shared/auth/service';
import { WarningsEnum } from 'src/app/utils/resources';
import { AuthState, AuthError } from '../../../utils/interfaces';
import {UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {isAuthError} from '../../../utils/resources';
import { Store } from '@ngrx/store';
import {registerEmail, signInEmail} from '../../../shared/store/actions';
import { map, take, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'auth-dialog',
  standalone: true,
  templateUrl: 'auth-dialog.component.html',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AuthDialog {
  readonly destroyObs$ = new ReplaySubject(1);
  readonly WarningsEnum = WarningsEnum;

  userAuthForm: FormGroup;
  userAuthError: WarningsEnum|undefined = undefined;
  credential: UserCredential|undefined;
  userEmail: string|undefined;
  userPassword: string|undefined;
  userConfPassword: string|undefined;
  // whether this auth dialog is signing a user in or signing one up
  signInMode = false;
  readonly firebaseAuthService = new FirebaseAuthService();

  userCredential$: Promise<UserCredential|AuthError>|undefined = undefined;

  // TODO: Instead of using these, use form control's built-in error handling
  generalAuthRegError = false;
  passwordMustMatchError = false;

  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthDialog>,
    private authStore: Store<AuthState>,
    @Inject(MAT_DIALOG_DATA) public data: SignUpDialogData,
  ) {
    this.userAuthForm = this.fb.group<SignUpDialogData>({
      // TODO: This smells weird
      email: '',
      password: '',
      confPassword: '',
    });
    this.authStore.select('userCredential').pipe(takeUntil(this.destroyObs$), 
        map((credentials) => {
          if(credentials) {
            this.userCredential$ = credentials;
          }
      }));

    this.authStore.select('userAuthError').pipe(take(1), map(async (authError) => {
        if(authError) {
          this.userAuthError = (await authError).errorType
        }
    }))
  }

  setValue() {
    this.userEmail = this.userAuthForm.get('email')?.value; // input value retrieved
    this.userPassword = this.userAuthForm.get('password')?.value;
    this.userConfPassword = this.userAuthForm.get('confPassword')?.value;
  }

  authenticate() {
    this.setValue();
    if(this.signInMode) {
      this.signInUserEmail(`${this.userEmail}`, `${this.userPassword}`);
    } else if(this.userPassword === this.userConfPassword) {
      this.registerUserEmail(`${this.userEmail}`, `${this.userPassword}`);
    } else {
      this.userAuthError = WarningsEnum.PASSWORD_MATCH;
    }
    if(this.credential) {
      this.dialogRef.close();
    }
  }

  // TODO: Abstract auth functions into a Record or object
  registerUserEmail(email: string, password: string) {
    this.authStore.dispatch(registerEmail({userEmail: email, userPassword: password}))
  }

  signInUserEmail(email: string, password: string) {
    this.authStore.dispatch(signInEmail({userEmail: email, userPassword: password}))
  }

  updateFormType() {
    this.signInMode = !this.signInMode;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}