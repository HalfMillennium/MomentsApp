import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { UserCredential } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../common/config/firebase';
import { Observable, of as observableOf } from 'rxjs';
import { DatabaseError } from '../../utils/interfaces';
import { addDoc, collection } from 'firebase/firestore';
import { DEFAULT_DATABASE_ERROR } from '../../utils/resources';

export class FirebaseStorageService {
  private readonly app = initializeApp(FIREBASE_CONFIG);
  private readonly db = getFirestore(this.app);

  constructor() {}

  // initUserName --> Called when a user first registers to update them

  addBuilding() {}

  async createHotSpotUser(
    user: UserCredential,
    displayName: string
  ): Promise<Observable<UserCredential | DatabaseError>> {
    try {
      const docRef = await addDoc(collection(this.db, 'users'), {
        user,
        displayName,
      });
      console.log('Document written with ID: ', docRef.id);
      return observableOf(user);
    } catch (exception) {
      console.error('Error adding document: ', exception);
      return observableOf(DEFAULT_DATABASE_ERROR);
    }
  }
}
