import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from './utils/resources';
import {SessionState} from './utils/interfaces';
import { AuthDialog } from './pages/auth_dialog/auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { AngularFaviconService } from 'angular-favicon';
import {FAVICON_URL} from './utils/resources';
import { Store } from '@ngrx/store';
import { User, UserCredential } from 'firebase/auth';
import {Observable, ReplaySubject, map, takeUntil} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly MENU_ITEMS = MENU_ITEMS;
  readonly destroyObs$ = new ReplaySubject(1);

  userCredential$: Promise<UserCredential|undefined>|undefined = undefined;

  constructor(private ngxFavicon: AngularFaviconService, 
              private dialog: MatDialog, 
              private router: Router,
              private store: Store<SessionState>) {
      store.select('userCredential').pipe(takeUntil(this.destroyObs$), 
        map((credentials) => {
          if(credentials) {
            this.userCredential$ = credentials;
          }
      }));
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  openAuthDialog() {
    let dialogRef = this.dialog.open(AuthDialog, {width: '300px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('AuthDialog has closed.');
    });
  }

  ngOnInit() {
    this.ngxFavicon.setFavicon(FAVICON_URL);
  }
}
