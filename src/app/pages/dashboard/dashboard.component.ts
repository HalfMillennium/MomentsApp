import { Component } from '@angular/core';
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
export class Dashboard {
  readonly MOCK_SPACES = MOCK_SPACES;

  constructor(private router: Router) {}
  
}