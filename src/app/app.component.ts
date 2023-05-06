import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from './utils/resources';
import { AuthDialog } from './pages/auth_dialog/auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { AngularFaviconService } from 'angular-favicon';
import {FAVICON_URL} from './utils/resources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly MENU_ITEMS = MENU_ITEMS;
  userAuthenticated = false;
  constructor(private ngxFavicon: AngularFaviconService, 
              private dialog: MatDialog, 
              private router: Router) {}

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
