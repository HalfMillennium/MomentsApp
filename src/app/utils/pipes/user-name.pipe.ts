import { Pipe, PipeTransform } from '@angular/core';
import { UserCredential } from 'firebase/auth';

@Pipe({
  name: 'userName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {

  transform(user: UserCredential|null|undefined): string {
    // TODO: Actually fetch real username once Firebase auth is reintegrated
    return `${user?.user}`;
  }

}
