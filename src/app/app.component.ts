import { Component } from '@angular/core';
import { MenuItem } from './utils/interfaces';
import {MENU_ITEMS} from './utils/resources';
import { AuthDialog } from './pages/auth_dialog/auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moments';
  readonly MENU_ITEMS = MENU_ITEMS;

  constructor(private dialog: MatDialog, private router: Router) {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  openAuthDialog() {
    let dialogRef = this.dialog.open(AuthDialog, {height: "250px", width: "250px"});
    dialogRef.afterClosed().subscribe(result => {
      console.log('AuthDialog has closed.');
    });
  }
}
