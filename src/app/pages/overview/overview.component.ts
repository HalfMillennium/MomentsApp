import { Component } from '@angular/core';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  imports: [MaterialModule],
})
export class Overview {}
