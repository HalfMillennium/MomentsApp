import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs';
import {
  TEST_HOTSPOT_USER,
  TEST_USER_CREDENTIAL,
} from '../../utils/testing/resources';
import { DatabaseEffects } from './db.effects';
import * as dbActions from './db.actions';
import { Action } from '@ngrx/store';
import { FirebaseStorageService } from '../database/service';
import { UserCredential } from 'firebase/auth';
import { Store } from '@ngrx/store';

describe('Database Effects', () => {
  let effects: DatabaseEffects;
  let actions: ReplaySubject<Action>;
  let firebaseStorageService: jasmine.SpyObj<FirebaseStorageService>;
  let store: jasmine.SpyObj<Store>;
  firebaseStorageService = jasmine.createSpyObj('FirebaseStorageService', [
    'createHotSpotUserService',
  ]);
  store = jasmine.createSpyObj('Store', ['dispatch']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DatabaseEffects,
        FirebaseStorageService,
        provideMockActions(() => actions),
        { provide: FirebaseStorageService, useValue: firebaseStorageService },
        // other providers
      ],
    });

    effects = TestBed.inject(DatabaseEffects);
  });

  it('should process createUserSuccess action', async () => {
    actions = new ReplaySubject(1);
    actions.next(
      dbActions.createUser({
        user: TEST_USER_CREDENTIAL as UserCredential,
        displayName: 'userName',
      })
    );
    expect(firebaseStorageService.createHotSpotUser).toHaveBeenCalled();
  });
});
