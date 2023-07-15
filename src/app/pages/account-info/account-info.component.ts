import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { UserInfoDisplayComponent } from '../components/user-info-display/user-info-display.component';
import { MOCK_HOTSPOT_USER } from '../../utils/resources';
import { HotSpotUser } from 'src/app/utils/interfaces';

@Component({
  selector: 'account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, UserInfoDisplayComponent],
})
export class AccountInfoComponent {
  userData: HotSpotUser = MOCK_HOTSPOT_USER;
}
