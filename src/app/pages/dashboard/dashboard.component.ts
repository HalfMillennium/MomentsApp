import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../material.module';
import { MOCK_SPACES, MONTHS } from '../../utils/resources';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { UserState, MetaStores } from 'src/app/utils/interfaces';
import { UserNamePipe } from '../../utils/pipes/user-name.pipe';

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

  headerText: string|undefined = undefined;
  subHeaderText: string|undefined = undefined;
  currentTimeOfDay: string|undefined = undefined;
  currentMonthDay: string|undefined = undefined;
  currentYear: string|undefined = undefined;

  displayName$: Observable<UserState> = 
    this.store.select('user').pipe(takeUntil(this.destroyObs$));
  
  constructor(private router: Router, private store: Store<MetaStores>) {
    this.headerText = "Welcome back.";
    this.subHeaderText = "New spaces below...";
  }

  ngAfterViewInit() {
    const d = new Date();
    this.currentMonthDay = `${MONTHS[d.getMonth()]} ${d.getDate()}`;
    this.currentYear = `${d.getFullYear()}`;
    this.currentTimeOfDay = `${d.getHours()}h:${d.getMinutes()}m:${d.getSeconds()}s`;
  }
  
}