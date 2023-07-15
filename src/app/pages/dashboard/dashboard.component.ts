import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MOCK_BUILDINGS } from '../../utils/buildings/resources';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil, map, take } from 'rxjs';
import { AuthState, MetaStores, UserDataState } from 'src/app/utils/interfaces';
import { UserNamePipe } from '../../utils/pipes/user-name.pipe';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../auth_dialog/auth-dialog/auth-dialog.component';
import { UserCredential } from 'firebase/auth';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from 'src/app/shared/auth/service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, UserNamePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class Dashboard {
  readonly destroyObs$ = new ReplaySubject(1);
  readonly MOCK_BUILDINGS = MOCK_BUILDINGS;

  user: User | undefined;

  subHeaderText: string | undefined = undefined;

  pageDataLoaded = false;

  dashboardTabs: Record<
    string,
    {
      tabTitle: string;
      tabSubTitle: string;
      active: boolean;
    }
  > = {
    'recently-visited': {
      tabTitle: 'Recently visited',
      tabSubTitle: "Buildings you've marked as visited on the HotSpot app.",
      active: true,
    },
    favorited: {
      tabTitle: 'Favorited buildings',
      tabSubTitle: "Visited buildings that you've favorited.",
      active: false,
    },
    popular: {
      tabTitle: 'Popular',
      tabSubTitle: 'Buildings that are popular with other HotSpot users.',
      active: false,
    },
  };

  currentDashboardTabId = 'recently-visited';

  userAuthState$: Observable<AuthState> = this.store
    .select('auth')
    .pipe(takeUntil(this.destroyObs$));

  userDataState$: Observable<UserDataState> = this.store
    .select('db')
    .pipe(takeUntil(this.destroyObs$));

  constructor(
    private router: Router,
    private store: Store<MetaStores>,
    private firebaseAuthService: FirebaseAuthService,
    private dialog: MatDialog,
    private readonly cookieService: CookieService
  ) {
    const currentUser = this.cookieService.get('userCredential');
    if (currentUser) {
      this.user = (JSON.parse(currentUser) as UserCredential).user;
    }
    this.userDataState$.subscribe(async (state: UserDataState) => {
      if (state.shouldReloadUser) {
        this.firebaseAuthService.reloadUser();
      }
    });
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

  selectTab(tabId: string) {
    this.currentDashboardTabId = tabId;
  }
}
