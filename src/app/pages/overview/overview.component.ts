import { Component } from '@angular/core';
import { MaterialModule } from 'src/material.module';
import { EXAMPLE_INFO_TEXT } from 'src/app/utils/resources';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  imports: [
    MaterialModule
  ]
})
export class Overview {
  readonly EXAMPLE_INFO_TEXT = EXAMPLE_INFO_TEXT;
}
