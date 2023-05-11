import { Component } from '@angular/core';
import { MaterialModule } from 'src/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-user-confirmation',
  standalone: true,
  imports: [
    MaterialModule,
    RouterModule
  ],
  templateUrl: './new-user-confirmation.component.html',
  styleUrls: ['./new-user-confirmation.component.scss']
})
export class NewUserConfirmation {
  
}
