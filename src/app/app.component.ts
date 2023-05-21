import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from './utils/resources';
import { AuthDialog } from './pages/auth_dialog/auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { AngularFaviconService } from 'angular-favicon';
import {FAVICON_URL, parseUserAuthState, reloadPage} from './utils/resources';
import { Store } from '@ngrx/store';
import {Observable, ReplaySubject, map, takeUntil} from 'rxjs';
import { AuthState, MenuItem, MetaStores } from './utils/interfaces';
import {FirebaseAuthService} from './shared/auth/service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly MENU_ITEMS = MENU_ITEMS;
  readonly destroyObs$ = new ReplaySubject(1);

  userCredentialCookie = this.cookieService.get('userCredential');

  // Simple, non-nullable UserCredential
  currentUserCredential = parseUserAuthState(this.userCredentialCookie);

  userAuthState$: Observable<AuthState> = 
    this.store.select('auth').pipe(takeUntil(this.destroyObs$));

  constructor(private ngxFavicon: AngularFaviconService, 
              private dialog: MatDialog, 
              private router: Router,
              private store: Store<MetaStores>,
              private snackBar: MatSnackBar,
              private cookieService: CookieService,
              private firebaseAuthService: FirebaseAuthService) {
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  openAuthDialog() {
    let dialogRef = this.dialog.open(AuthDialog, {width: '325px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('AuthDialog has closed.');
    });
  }

  getOnClick(item: MenuItem) {
    switch(item.name) {
      case 'sign_out':
        this.signOut();
        break;
      case 'account':
        this.openAuthDialog();
        break;
      default:
        this.navigateTo(item.routerLink!);
    }
  }

  signOut() {
    this.firebaseAuthService.signOut()
      .then((error: string|undefined) => {
          if(error) {
            this.snackBar.open(`Could not sign out user: ${error}`);
          } else {
            this.snackBar.open('User signed out.');
            this.clearAuthCookies();
            reloadPage();
          }
      })
  }

  clearAuthCookies() {
    this.cookieService.delete('userCredential', '/');
    this.cookieService.delete('displayName', '/');
  }

  ngOnInit() {
    this.ngxFavicon.setFavicon(FAVICON_URL);
  }
}
