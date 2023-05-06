import { Component } from '@angular/core';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'app-new-user-confirmation',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './new-user-confirmation.component.html',
  styleUrls: ['./new-user-confirmation.component.scss']
})
export class NewUserConfirmation {

}
