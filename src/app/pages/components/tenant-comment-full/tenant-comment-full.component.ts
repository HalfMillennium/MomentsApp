import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tenant-comment-full',
  templateUrl: './tenant-comment-full.component.html',
  styleUrls: ['./tenant-comment-full.component.scss'],
})
export class TenantCommentFull {
  constructor(public dialogRef: MatDialogRef<TenantCommentFull>) {}
}
