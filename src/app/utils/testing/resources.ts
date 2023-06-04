import { UserCredential } from 'firebase/auth';
import { HotSpotUser } from '../interfaces';
import { User } from 'firebase/auth';

export const TEST_HOTSPOT_USER: HotSpotUser = {
  userCredential: {} as UserCredential,
  displayName: 'MrShock_OG',
};

export const TEST_USER_CREDENTIAL = {
  /**
   * The user authenticated by this credential.
   */
  user: 'user' as unknown as User,
  /**
   * The provider which was used to authenticate the user.
   */
  providerId: 'id',
  /**
   * The type of operation which was used to authenticate the user (such as sign-in or link).
   */
  operationType: 'val',
};
