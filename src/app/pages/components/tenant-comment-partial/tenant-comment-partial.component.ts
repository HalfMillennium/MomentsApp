import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantComment } from 'src/app/utils/buildings/interfaces';
import { CommentDisplayPipe } from 'src/app/utils/pipes/comment-display.pipe';
import { MaterialModule } from 'src/material.module';

@Component({
  selector: 'tenant-comment-partial',
  templateUrl: './tenant-comment-partial.component.html',
  styleUrls: ['./tenant-comment-partial.component.scss'],
  standalone: true,
  imports: [CommentDisplayPipe, MaterialModule, CommonModule],
})
export class TenantCommentPartial {
  @Input() tenantComment!: TenantComment;

  getTenantStatus(): string {
    let icon = '';
    switch (this.tenantComment.currentTenant) {
      case true:
        icon = 'person';
        break;
      case false:
        icon = 'person_remove';
        break;
      default:
        icon = 'person_outline';
    }
    return icon;
  }

  getIconTooltip(): string {
    let tooltip = '';
    switch (this.tenantComment.currentTenant) {
      case true:
        tooltip = 'Current tenant';
        break;
      case false:
        tooltip = 'Former tenant';
        break;
      default:
        tooltip = 'Unidentified user';
    }
    return tooltip;
  }
}
