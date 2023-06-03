import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { User, UserCredential } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../common/config/firebase';

export class FirebaseStorageService {
  private readonly app = initializeApp(FIREBASE_CONFIG);
  private readonly db = getFirestore(this.app);

  constructor() {}

  // initUserName --> Called when a user first registers to update them

  addBuilding() {}

  createUser(user: UserCredential, displayName: string) {}
}
