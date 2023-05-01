import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../material.module';
import { MOCK_SPACES } from '../../utils/resources';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class Dashboard implements AfterViewInit {
  readonly MOCK_SPACES = MOCK_SPACES;
  headerText: string|undefined = undefined;
  subHeaderText: string|undefined = undefined;
  currentTimeOfDay: string|undefined = undefined;
  
  constructor(private router: Router) {
    this.headerText = "Welcome back."
    this.subHeaderText = "New spaces below..."
  }

  ngAfterViewInit() {
    const d = new Date();
    this.currentTimeOfDay = `${d.getHours()}h:${d.getMinutes()}m:${d.getSeconds()}s`;
  }
  
}