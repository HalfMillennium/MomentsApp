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
import { FirestoreService } from '../database/service';
import { UserCredential } from 'firebase/auth';
import { Store } from '@ngrx/store';

describe('Database Effects', () => {
  let effects: DatabaseEffects;
  let actions: ReplaySubject<Action>;
  let firestoreService: jasmine.SpyObj<FirestoreService>;
  let store: jasmine.SpyObj<Store>;
  firestoreService = jasmine.createSpyObj('FirestoreService', [
    'addHotSpotUser',
  ]);
  store = jasmine.createSpyObj('Store', ['dispatch']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DatabaseEffects,
        FirestoreService,
        provideMockActions(() => actions),
        { provide: FirestoreService, useValue: firestoreService },
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
    expect(firestoreService.addHotSpotUser).toHaveBeenCalled();
  });
});
