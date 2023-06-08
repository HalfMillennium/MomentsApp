import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { UserCredential } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../common/config/firebase';
import { Observable, of as observableOf } from 'rxjs';
import { DatabaseError } from '../../utils/interfaces';
import { doc, collection, setDoc } from 'firebase/firestore';
import { DEFAULT_DATABASE_ERROR } from '../../utils/resources';

export interface CreateUserResponse {
  response: UserCredential | DatabaseError;
  displayName: string;
}

export class FirestoreService {
  private readonly app = initializeApp(FIREBASE_CONFIG);
  private readonly db = getFirestore(this.app);

  constructor() {}

  addBuilding() {}

  async addHotSpotUser(
    user: UserCredential,
    displayName: string
  ): Promise<Observable<CreateUserResponse>> {
    try {
      await setDoc(doc(this.db, 'users', user.user.uid), {
        displayName,
      });
      console.log('Document written with ID: ', user.user.uid);
      return observableOf({ response: user, displayName });
    } catch (exception) {
      console.error('Error adding document: ', exception);
      return observableOf({ response: DEFAULT_DATABASE_ERROR, displayName });
    }
  }
}
