import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MOCK_SPACES, MONTHS, parseUserAuthState } from '../../utils/resources';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil, map } from 'rxjs';
import { AuthState, MetaStores } from 'src/app/utils/interfaces';
import { UserNamePipe } from '../../utils/pipes/user-name.pipe';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../auth_dialog/auth-dialog/auth-dialog.component';
import { UserCredential } from 'firebase/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, UserNamePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class Dashboard implements AfterViewInit {
  readonly destroyObs$ = new ReplaySubject(1);
  readonly MOCK_SPACES = MOCK_SPACES;

  user: User | undefined;

  subHeaderText: string | undefined = undefined;

  currentTimeOfDay: string | undefined = undefined;
  currentMonthDay: string | undefined = undefined;
  currentYear: string | undefined = undefined;

  userAuthState$: Observable<AuthState> = this.store
    .select('auth')
    .pipe(takeUntil(this.destroyObs$));

  displayName = this.cookieService.get('displayName');

  constructor(
    private router: Router,
    private store: Store<MetaStores>,
    private dialog: MatDialog,
    private readonly cookieService: CookieService
  ) {
    this.subHeaderText = 'A place to find your place.';
    const currentUser = this.cookieService.get('userCredential');
    if (currentUser) {
      this.user = (JSON.parse(currentUser) as UserCredential).user;
    }

    this.userAuthState$
      .pipe(takeUntil(this.destroyObs$))
      .subscribe((newAuthState: AuthState) => {
        if (newAuthState.userCredential) {
          this.cookieService.set(
            'displayName',
            `${newAuthState.userCredential.user.displayName}`
          );
        }
      });
  }

  ngAfterViewInit() {
    const d = new Date();
    this.currentMonthDay = `${MONTHS[d.getMonth()]} ${d.getDate()}`;
    this.currentYear = `${d.getFullYear()}`;
    this.currentTimeOfDay = `${d.getHours()}h:${d.getMinutes()}m:${d.getSeconds()}s`;
  }

  openAuthDialog() {
    let dialogRef = this.dialog.open(AuthDialog, { width: '325px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('AuthDialog has closed.');
    });
  }

  fetchUserName(username: any) {
    console.log('username:', username);
    return username;
  }
}
