import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { HotSpotUser, UserAttributeDisplay } from 'src/app/utils/interfaces';

@Component({
  selector: 'user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrls: ['./user-info-display.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class UserInfoDisplayComponent {
  @Input({ required: true }) userData!: HotSpotUser;
  visibleDetails?: UserAttributeDisplay[];

  hoverStyles: string[] = [];

  constructor() {}

  addElevation() {
    this.hoverStyles = this.hoverStyles.concat(['mat-elevation-z3']);
    console.log('moused over');
  }

  removeElevation() {
    this.hoverStyles = [];
    console.log('mouse left');
  }
}
