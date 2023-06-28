import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentDisplay',
  standalone: true,
})
export class CommentDisplayPipe implements PipeTransform {
  maxLength = 100;

  transform(comment: string): string {
    if (comment.length < this.maxLength) {
      return comment;
    }
    return comment.substring(0, this.maxLength) + '...';
  }
}
