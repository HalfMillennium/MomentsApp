import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import {
  HotSpotUser,
  MetaStores,
  UserAttributeDisplay,
} from 'src/app/utils/interfaces';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { AuthState } from 'src/app/utils/interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrls: ['./user-info-display.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class UserInfoDisplayComponent {
  // TODO: Deprecated
  @Input({ required: true }) userData!: HotSpotUser;
  visibleDetails?: UserAttributeDisplay[];
  protected readonly destroyObs$ = new ReplaySubject(1);

  userAuthState$: Observable<AuthState> = this.store
    .select('auth')
    .pipe(takeUntil(this.destroyObs$));

  hoverStyles: string[] = [];

  constructor(private store: Store<MetaStores>) {
    this.visibleDetails = this.userAuthState$
      .pipe(takeUntil(this.destroyObs$))
      .subscribe((state) => {
        if (state.userCredential?.user) {
        }
      });
  }

  addElevation() {
    this.hoverStyles = this.hoverStyles.concat(['mat-elevation-z3']);
    console.log('moused over');
  }

  removeElevation() {
    this.hoverStyles = [];
    console.log('mouse left');
  }
}
