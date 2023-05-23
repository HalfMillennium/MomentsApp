import { Pipe, PipeTransform } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { AuthState, UserState } from '../interfaces';

@Pipe({
  name: 'userName',
  standalone: true,
})
export class UserNamePipe implements PipeTransform {
  transform(userState: AuthState | undefined): string | null | undefined {
    // TODO: Actually fetch real username once Firebase auth is reintegrated
    return userState?.userCredential?.user?.displayName;
  }
}
