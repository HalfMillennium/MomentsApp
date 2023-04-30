import { Component } from '@angular/core';
import { MenuItem } from './utils/interfaces';
import {menuItems} from './utils/resources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moments';
  readonly menuItems = menuItems;
}
