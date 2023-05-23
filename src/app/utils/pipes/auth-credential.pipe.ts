import { Pipe, PipeTransform } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { AuthState } from '../interfaces';

@Pipe({
  name: 'authCredential',
  standalone: true,
})
export class AuthCredentialPipe implements PipeTransform {

  transform(authState: AuthState|null): UserCredential|undefined {
    return authState?.userCredential;
  }

}
