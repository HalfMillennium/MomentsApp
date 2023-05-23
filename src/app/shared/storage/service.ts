import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

import { FIREBASE_CONFIG } from '../common/config/firebase';

export class FirebaseStorageService {
  storage = getStorage(initializeApp(FIREBASE_CONFIG));

  storageRef = ref(this.storage);

  constructor() {}
}
