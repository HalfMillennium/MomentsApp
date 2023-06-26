import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tenant-comment-partial',
  templateUrl: './tenant-comment-partial.component.html',
  styleUrls: ['./tenant-comment-partial.component.scss'],
})
export class TenantCommentPartialComponent {
  @Input() postDate!: string;
  @Input() currentClaps?: number;
}
