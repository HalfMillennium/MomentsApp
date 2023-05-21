import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../material.module';
import { MOCK_SPACES, MONTHS, parseUserAuthState } from '../../utils/resources';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { AuthState, MetaStores } from 'src/app/utils/interfaces';
import { UserNamePipe } from '../../utils/pipes/user-name.pipe';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialog } from '../auth_dialog/auth-dialog/auth-dialog.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, UserNamePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class Dashboard implements AfterViewInit {
  readonly destroyObs$ = new ReplaySubject(1);
  readonly MOCK_SPACES = MOCK_SPACES;
  private readonly cookieService = inject(CookieService);

  headerText: string|undefined = undefined;
  subHeaderText: string|undefined = undefined;
  currentTimeOfDay: string|undefined = undefined;
  currentMonthDay: string|undefined = undefined;
  currentYear: string|undefined = undefined;

  displayNameCookie = this.cookieService.get('displayName');
  userCredentialCookie = this.cookieService.get('userCredential');

  // Simple, non-nullable UserCredential
  currentUserCredential = parseUserAuthState(this.userCredentialCookie);
  
  constructor(
    private router: Router, 
    private store: Store<MetaStores>,
    private dialog: MatDialog) {
    this.headerText = "Welcome back.";
    this.subHeaderText = "New spaces below...";
  }

  ngAfterViewInit() {
    const d = new Date();
    this.currentMonthDay = `${MONTHS[d.getMonth()]} ${d.getDate()}`;
    this.currentYear = `${d.getFullYear()}`;
    this.currentTimeOfDay = `${d.getHours()}h:${d.getMinutes()}m:${d.getSeconds()}s`;
  }
  
  openAuthDialog() {
    let dialogRef = this.dialog.open(AuthDialog, {width: '325px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('AuthDialog has closed.');
    });
  }
}