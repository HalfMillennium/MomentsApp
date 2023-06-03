import { UserCredential } from 'firebase/auth';
import {
  ApartmentBuilding,
  CarouselSlides,
  User,
  MenuItem,
  AuthError,
  AuthState,
  Credentials,
  UserState,
  DatabaseError,
  UserDataState,
} from './interfaces';
import { OperationType } from 'firebase/auth';
import { authReducer, databaseReducer } from '../shared/store/reducer';
import { AuthEffects } from '../shared/store/auth_effects';

/** Menu items */
export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'dash_home',
    icon: 'dashboard',
    label: 'Dashboard',
    routerLink: '/',
  },
  {
    name: 'saved_stories',
    icon: 'save',
    label: 'Saved Stories',
    routerLink: '',
  },
  {
    name: 'about',
    icon: 'info',
    label: 'What Is This?',
    routerLink: '/info',
  },
  {
    name: 'account',
    icon: 'account_circle',
    label: 'Account',
    routerLink: '/account',
    auth: true,
  },
  {
    name: 'sign_out',
    icon: 'logout',
    label: 'Sign Out',
    auth: true,
  },
];

/** Test API response for... testing */
export const TEST_API_RESPONSE = {
  image: 'test_image',
  desc: 'New dog breed discovered in Kenya',
  title: 'Kenyorgi Dogs',
  alt: 'Photo of Kenyorgi dog',
};

/** Example text for info/"what is this" page */
export const EXAMPLE_INFO_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua. Vel pretium lectus quam id leo in. In iaculis nunc sed augue lacus. Eu consequat ac felis donec et odio pellentesque. ' +
  'Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. In hac habitasse platea dictumst. Risus at ultrices mi tempus imperdiet. Sed odio morbi quis commodo odio aenean. Cras tincidunt lobortis feugiat vivamus at augue eget arcu. Malesuada bibendum arcu vitae elementum curabitur vitae. Urna cursus eget nunc scelerisque. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Quis varius quam quisque id diam vel quam elementum. Non tellus orci ac auctor augue. Semper eget duis at tellus at urna condimentum mattis pellentesque. Faucibus ornare suspendisse sed nisi lacus sed. Vel risus commodo viverra maecenas accumsan. Id faucibus nisl tincidunt eget nullam. Blandit massa enim nec dui nunc. Commodo elit at imperdiet dui accumsan sit. Bibendum at varius vel pharetra vel turpis nunc. Sem et tortor consequat id. Scelerisque purus semper eget duis at. Arcu ac tortor dignissim convallis aenean et. Nunc aliquet bibendum enim facilisis gravida. Consectetur a erat nam at lectus urna duis convallis convallis. Dictum fusce ut placerat orci. Quam pellentesque nec nam aliquam sem. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Viverra mauris in aliquam sem fringilla ut. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Leo in vitae turpis massa sed. Vulputate mi sit amet mauris commodo quis. Nulla pellentesque dignissim enim sit amet. Dignissim sodales ut eu sem integer vitae justo eget magna. Dolor sit amet consectetur adipiscing. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Elementum facilisis leo vel fringilla. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Ut ornare lectus sit amet est placerat. Purus viverra accumsan in nisl nisi scelerisque eu. Vitae sapien pellentesque habitant morbi tristique. Volutpat odio facilisis mauris sit amet massa. Enim nulla aliquet porttitor lacus luctus. In mollis nunc sed id. Sit amet massa vitae tortor condimentum lacinia quis vel. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Tristique senectus et netus et malesuada fames ac turpis egestas. Orci phasellus egestas tellus rutrum tellus. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. In egestas erat imperdiet sed euismod nisi porta. Scelerisque eleifend donec pretium vulputate. Diam quam nulla porttitor massa id neque. Nulla facilisi cras fermentum odio eu feugiat. Tristique magna sit amet purus gravida quis. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Varius quam quisque id diam vel quam.';

export enum BuildingAmenityTypeEnum {
  LAUNDRY_IN_UNIT = 'Laundry, In-Unit',
  LAUNDRY_IN_BUILDING = 'Laundry, In-Building',
  POOL_OUTDOOR = 'Outdoor Pool',
  POOL_INDOOR = 'Indoor Pool',
  POOL = 'Pool',
  DOORMAN = 'Doorman',
  FULL_TIME_DOORMAN = '24/7 Doorman',
  ELEVATOR = 'Elevator',
  ROOFTOP = 'Rooftop',
  TERRACE = 'Terrace',
  REFUSE_EACH_FLOOR = 'Refuse room, each floor',
  GYM = 'Gym',
  REC_AREA = 'Recreational area(s)',
}

/** Mock spaces for example dashboard data */
export const MOCK_BUILDINGS: ApartmentBuilding[] = [
  {
    id: '11',
    title: '360 West',
    addr: '360 West 43rd St, New York, NY 10036',
    desc: 'Classic brick building located near the heart of Times Square.',
    images: [
      {
        url: 'https://brodsky.com/uploads/_styles/portfolio-slide/building/360-w-43-lobby3.jpg',
        alt: 'Lobby of 360 West 43rd street',
      },
      {
        url: 'https://s3-us-west-2.amazonaws.com/transparentcity/uploads/images/000/039/468/original/360_West_43rd_Street_Exterior3.jpg?1603465654',
        alt: 'Exterior shot of 360 West 43rd street',
      },
    ],
    floors: 24,
    amenities: [
      BuildingAmenityTypeEnum.DOORMAN,
      BuildingAmenityTypeEnum.ELEVATOR,
      BuildingAmenityTypeEnum.LAUNDRY_IN_BUILDING,
      BuildingAmenityTypeEnum.REFUSE_EACH_FLOOR,
      BuildingAmenityTypeEnum.TERRACE,
      BuildingAmenityTypeEnum.GYM,
      BuildingAmenityTypeEnum.ROOFTOP,
    ],
  },
  {
    id: '11',
    title: 'The Landon',
    addr: '520 West 43rd St, New York, NY 10036',
    desc: 'Modern full-service building located near the Westside Highway and the historic Pier 76.',
    images: [
      {
        url: 'https://thelandonnyc.com/wp-content/uploads/sites/5/2022/03/The-Landon-Resident-Lounge-min-1-scaled.jpg',
        alt: 'Rec room at The Landon NYC',
      },
      {
        url: 'https://images1.apartments.com/i2/aV3LMN2FWbLpxizqLkUVNQopxHd84D7fafvBXup6pwo/111/the-landon-new-york-ny-primary-photo.jpg',
        alt: 'Rooftop at The Landon NYC',
      },
    ],
    floors: 24,
    amenities: [
      BuildingAmenityTypeEnum.DOORMAN,
      BuildingAmenityTypeEnum.ELEVATOR,
      BuildingAmenityTypeEnum.LAUNDRY_IN_BUILDING,
      BuildingAmenityTypeEnum.REFUSE_EACH_FLOOR,
      BuildingAmenityTypeEnum.TERRACE,
      BuildingAmenityTypeEnum.GYM,
      BuildingAmenityTypeEnum.LAUNDRY_IN_UNIT,
      BuildingAmenityTypeEnum.POOL_INDOOR,
      BuildingAmenityTypeEnum.POOL_OUTDOOR,
      BuildingAmenityTypeEnum.ROOFTOP,
      BuildingAmenityTypeEnum.REC_AREA,
    ],
  },
];

export const MOCK_CAROUSEL_SLIDES: CarouselSlides[] = [
  {
    id: '0',
    src: 'https://kenyaholidays.travel/wp-content/uploads/2020/08/African-Wild-Dog-portrait.jpg',
    title: 'Kenyorgi dogs',
    subtitle: 'New dog breed discovered in Kenya',
    routerLink: '',
  },
  {
    id: '1',
    src: 'https://i0.wp.com/mpala.org/wp-content/uploads/2020/01/Two-wild-dogs.jpg?fit=739%2C415&ssl=1',
    title: 'Kenyorgi dogs',
    subtitle: 'New dog breed discovered in Kenya',
    routerLink: '',
  },
  {
    id: '2',
    src: 'https://optimise2.assets-servd.host/maniacal-finch/production/animals/painted-dog-01-01.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1658934200&s=81da609829d4362aa959790573f32085',
    title: 'Kenyorgi dogs',
    subtitle: 'New dog breed discovered in Kenya',
    routerLink: '',
  },
];

/** -_- */
export const MONTHS: Record<number, string> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const DEFAULT_EMPTY_USER: User = {
  uid: 'DEF',
  email: 'test@test',
  displayName: 'def',
  emailVerified: false,
};

// Enum with all currently supported sign in types
export enum AuthTypesEnum {
  EMAIL_PASS = 'email_pass',
  // GOOGLE = 'google',
  // others..
}

// Enum of all user warnings supported by UI (i.e. that will display an explicit error message)
export enum WarningsEnum {
  PASSWORD_MATCH = 'password_word',
  EMAIL_TAKEN = 'email_taken',
  UNSUPPORTED_TYPE = 'unsupported_type',
  WEAK_PASSWORD = 'weak_password',
  EMAIL_PASSWORD_INCORRECT = 'email_password_incorrect',
  FIRESTORE_DB_ERROR = 'firestore_db_error',
  OTHER = 'other',
  // others
}

export enum Features {
  Auth = 'Auth',
  // others
}

// Favicon URL
export const FAVICON_URL =
  'https://img.icons8.com/ios/50/f9f9f9/apple-news.png';

// Returns whether or not auth API response was error or UserCredential
export function isAuthError(
  obj: AuthError | UserCredential | undefined | null
): obj is AuthError {
  return (obj as AuthError)?.code ? true : false;
}

// Type container all currently supported reducers
export type AppReducers = {
  authReducer: AuthState;
  databaseReducer: UserDataState;
};

export const UNKNOWN_EMAIL_AUTH_SERVER_ERROR = {
  authType: AuthTypesEnum.EMAIL_PASS,
  errorType: WarningsEnum.OTHER,
  code: '500',
  message: 'Unknown server error...',
};

export const EMPTY_CREDENTIAL: Credentials = {
  type: AuthTypesEnum.EMAIL_PASS,
};

export const FIREBASE_AUTH_ERROR_EMAIL_IN_USE =
  'Firebase: Error (auth/email-already-in-use).';

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

export const APP_REDUCERS = {
  auth: authReducer,
  db: databaseReducer,
};

export const APP_EFFECTS = [AuthEffects];

/** Parses userAuthState from cookies */
export function parseUserAuthState(rawAuthState: string | undefined) {
  return rawAuthState ? (JSON.parse(rawAuthState) as AuthState) : undefined;
}

export function reloadPage() {
  window.location.reload();
}

export function isDatabaseError(
  obj: UserCredential | DatabaseError
): obj is DatabaseError {
  return (obj as DatabaseError).errorType === WarningsEnum.FIRESTORE_DB_ERROR;
}

export const DEFAULT_DATABASE_ERROR: DatabaseError = {
  code: 500,
  message: 'SERVER ERROR - Could not complete database operation.',
  errorType: WarningsEnum.FIRESTORE_DB_ERROR,
};
