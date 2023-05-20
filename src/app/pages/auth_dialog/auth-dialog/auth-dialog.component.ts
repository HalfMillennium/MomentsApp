import {Component, Inject, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';
import {SignUpDialogData, UserState} from '../../../utils/interfaces';
import { FirebaseAuthService } from 'src/app/shared/auth/service';
import { WarningsEnum } from 'src/app/utils/resources';
import { AuthState, MetaStores } from '../../../utils/interfaces';
import {UserCredential } from 'firebase/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {isAuthError} from '../../../utils/resources';
import { Store } from '@ngrx/store';
import {registerEmail, signInEmail, updateUserBasics} from '../../../shared/store/actions';
import { map, take, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthErrorPipe } from 'src/app/utils/pipes/auth-error.pipe';
import {AuthCredentialPipe} from 'src/app/utils/pipes/auth-credential.pipe';
import { UserNamePipe } from 'src/app/utils/pipes/user-name.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'auth-dialog',
  standalone: true,
  templateUrl: 'auth-dialog.component.html',
  imports: [
    MaterialModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AuthErrorPipe, 
    AuthCredentialPipe,
    UserNamePipe,
  ],
})
export class AuthDialog implements OnDestroy {
  readonly destroyObs$ = new ReplaySubject(1);
  readonly WarningsEnum = WarningsEnum;
  readonly isAuthError = isAuthError;

  userAuthForm: FormGroup;
  userAuthError: WarningsEnum|undefined = undefined;
  userCredential: UserCredential|undefined;

  userName: string|undefined;
  userEmail: string|undefined;
  userPassword: string|undefined;
  userConfPassword: string|undefined;
  // whether this auth dialog is signing a user in or signing one up
  signInMode = false;
  readonly firebaseAuthService = new FirebaseAuthService();

  userAuthState$: Observable<AuthState> = 
    this.store.select('auth').pipe(takeUntil(this.destroyObs$));
  displayName$: Observable<UserState> =
    this.store.select('user').pipe(takeUntil(this.destroyObs$));

  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthDialog>,
    private store: Store<MetaStores>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: SignUpDialogData,
  ) {
    this.userAuthForm = this.fb.group<SignUpDialogData>({
      userName: this.fb.nonNullable.control<string>(''),
      email: this.fb.nonNullable.control<string>(''),
      password: this.fb.nonNullable.control<string>(''),
      confPassword: this.fb.nonNullable.control<string>(''),
    });
    this.userAuthState$.pipe(takeUntil(this.destroyObs$)).subscribe((newAuthState) => {
      if(newAuthState.userAuthError) {
        this.isAuthenticated = false;
        this.userAuthError = newAuthState.userAuthError.errorType;
      } else if(newAuthState.userCredential) {
        this.store.dispatch(updateUserBasics({userCredential: newAuthState.userCredential, 
                                    displayName: `${this.userName}`}))
        this.snackBar.open('Welcome new user!', 'Nice');
        this.onNoClick(); // close dialog
        console.log('User successfully authenticated!');
      }
    })
    this.displayName$.pipe(takeUntil(this.destroyObs$)).subscribe((userState: UserState) => {
            if(userState.displayName && !this.isAuthenticated) {
              this.isAuthenticated = true;
              this.userAuthError = undefined;
              this.onNoClick(); // close dialog when user is authenticated through dialog (and after UserBasics have been updated)
            }
        });
  }

  setFormValue() {
    this.userName = this.userAuthForm.get('userName')?.value;
    this.userEmail = this.userAuthForm.get('email')?.value;
    this.userPassword = this.userAuthForm.get('password')?.value;
    this.userConfPassword = this.userAuthForm.get('confPassword')?.value;
  }

  authenticate() {
    this.setFormValue();
    if(this.signInMode) {
      this.signInUserEmail(`${this.userEmail}`, `${this.userPassword}`);
    } else if(this.userPassword === this.userConfPassword) {
      this.registerUserEmail(`${this.userEmail}`, `${this.userPassword}`);
    } else {
      this.userAuthError = WarningsEnum.PASSWORD_MATCH;
    }
  }

  // TODO: Abstract auth functions into a Record or object
  registerUserEmail(email: string, password: string) {
    this.store.dispatch(registerEmail({userEmail: email, userPassword: password}));
  }

  signInUserEmail(email: string, password: string) {
    this.store.dispatch(signInEmail({userEmail: email, userPassword: password}))
  }

  updateFormType() {
    this.signInMode = !this.signInMode;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroyObs$.complete();
  }
}