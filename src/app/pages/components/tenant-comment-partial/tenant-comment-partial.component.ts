import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantComment } from 'src/app/utils/buildings/interfaces';
import { CommentDisplayPipe } from 'src/app/utils/pipes/comment-display.pipe';
import { MaterialModule } from 'src/material.module';
import { Observable, of as observableOf } from 'rxjs';
import { UserInteractionTypeEnum } from 'src/app/utils/resources';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TenantCommentFull } from '../tenant-comment-full/tenant-comment-full.component';

@Component({
  selector: 'tenant-comment-partial',
  templateUrl: './tenant-comment-partial.component.html',
  styleUrls: ['./tenant-comment-partial.component.scss'],
  standalone: true,
  imports: [CommentDisplayPipe, MaterialModule, CommonModule],
})
export class TenantCommentPartial {
  @Input() tenantComment!: TenantComment;
  @Input() userInteractionObs: Observable<UserInteractionTypeEnum> =
    observableOf(UserInteractionTypeEnum.NONE);

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  readonly UserInteractionTypeEnum = UserInteractionTypeEnum;

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

  getClapIconAttributes(userInteraction: UserInteractionTypeEnum | null) {
    let baseAttr = ['clap-icon'];
    if (
      userInteraction &&
      userInteraction === UserInteractionTypeEnum.FAVORITED
    ) {
      return baseAttr.concat('material-icons');
    }
    return baseAttr.concat('material-icons-outlined');
  }

  toggleClap(userInteraction: UserInteractionTypeEnum | null) {
    if (
      !userInteraction ||
      userInteraction === UserInteractionTypeEnum.FAVORITED
    ) {
      this.userInteractionObs = observableOf(UserInteractionTypeEnum.NONE);
      this.snackBar.open('Comment un-clapped.', 'Close', {
        duration: 2000,
      });
    } else {
      this.userInteractionObs = observableOf(UserInteractionTypeEnum.FAVORITED);
      this.snackBar.open('Comment clapped. Nice.', 'Close', {
        duration: 2000,
      });
    }
  }

  openFullComment(commentId: string) {
    this.dialog.open(TenantCommentFull, {
      width: '35rem',
    });
  }
}
