import { AuthCredentialPipe } from './auth-credential.pipe';

describe('UserCredentialPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthCredentialPipe();
    expect(pipe).toBeTruthy();
  });
});
