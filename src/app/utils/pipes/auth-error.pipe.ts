import { Pipe, PipeTransform } from '@angular/core';
import { AuthError, AuthState } from '../interfaces';

@Pipe({
  name: 'authError',
  standalone: true,
})
export class AuthErrorPipe implements PipeTransform {

  transform(authState: AuthState|null): AuthError|undefined {
    return authState?.userAuthError;
  }

}
