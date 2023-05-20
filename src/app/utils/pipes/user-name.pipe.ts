import { Pipe, PipeTransform } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { UserState } from '../interfaces';

@Pipe({
  name: 'userName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {

  transform(userState: UserState|null): string|undefined {
    // TODO: Actually fetch real username once Firebase auth is reintegrated
    return userState?.displayName;
  }

}
