import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';

export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'auth-dialog',
  standalone: true,
  templateUrl: 'auth-dialog.component.html',
  imports: [MaterialModule, CommonModule]
})
export class AuthDialog {
  constructor(public dialogRef: MatDialogRef<AuthDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}