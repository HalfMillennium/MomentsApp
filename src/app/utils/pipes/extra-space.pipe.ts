import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extraSpace',
  standalone: true,
})
export class ExtraSpacePipe implements PipeTransform {
  transform(text: string | undefined, numSpaces: number): string | undefined {
    let result = text;
    for (let i = 0; i < numSpaces; i++) {
      result = ' ' + result;
    }
    return result;
  }
}
