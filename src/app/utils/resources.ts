import { MenuItem } from "./interfaces";
import {SpaceInfo, CarouselSlides, User} from "./interfaces";

/** Menu items */
export const MENU_ITEMS: MenuItem[] = [
    {
        name: 'dash_home',
        icon: 'dashboard',
        label: 'Dashboard',
        routerLink: '/'
    },
    {
    name: 'saved_stories',
    icon: 'save',
    label: 'Saved Stories',
    routerLink: ''
    },
    {
    name: 'about',
    icon: 'info',
    label: 'What Is This?',
    routerLink: '/info'
    },
    {
      name: 'account',
      icon: 'account_circle',
      label: 'Account',
      routerLink: '/account'
    },
]

/** Test API response for... testing */
export const TEST_API_RESPONSE = {
    image: 'test_image',
    desc: 'New dog breed discovered in Kenya',
    title: 'Kenyorgi Dogs',
    alt: 'Photo of Kenyorgi dog'
}

/** Example text for info/"what is this" page */
export const EXAMPLE_INFO_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut "
+ "labore et dolore magna aliqua. Vel pretium lectus quam id leo in. In iaculis nunc sed augue lacus. Eu consequat ac felis donec et odio pellentesque. "
+ "Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. In hac habitasse platea dictumst. Risus at ultrices mi tempus imperdiet. Sed odio morbi quis commodo odio aenean. Cras tincidunt lobortis feugiat vivamus at augue eget arcu. Malesuada bibendum arcu vitae elementum curabitur vitae. Urna cursus eget nunc scelerisque. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Quis varius quam quisque id diam vel quam elementum. Non tellus orci ac auctor augue. Semper eget duis at tellus at urna condimentum mattis pellentesque. Faucibus ornare suspendisse sed nisi lacus sed. Vel risus commodo viverra maecenas accumsan. Id faucibus nisl tincidunt eget nullam. Blandit massa enim nec dui nunc. Commodo elit at imperdiet dui accumsan sit. Bibendum at varius vel pharetra vel turpis nunc. Sem et tortor consequat id. Scelerisque purus semper eget duis at. Arcu ac tortor dignissim convallis aenean et. Nunc aliquet bibendum enim facilisis gravida. Consectetur a erat nam at lectus urna duis convallis convallis. Dictum fusce ut placerat orci. Quam pellentesque nec nam aliquam sem. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Viverra mauris in aliquam sem fringilla ut. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Leo in vitae turpis massa sed. Vulputate mi sit amet mauris commodo quis. Nulla pellentesque dignissim enim sit amet. Dignissim sodales ut eu sem integer vitae justo eget magna. Dolor sit amet consectetur adipiscing. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Elementum facilisis leo vel fringilla. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Ut ornare lectus sit amet est placerat. Purus viverra accumsan in nisl nisi scelerisque eu. Vitae sapien pellentesque habitant morbi tristique. Volutpat odio facilisis mauris sit amet massa. Enim nulla aliquet porttitor lacus luctus. In mollis nunc sed id. Sit amet massa vitae tortor condimentum lacinia quis vel. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Tristique senectus et netus et malesuada fames ac turpis egestas. Orci phasellus egestas tellus rutrum tellus. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. In egestas erat imperdiet sed euismod nisi porta. Scelerisque eleifend donec pretium vulputate. Diam quam nulla porttitor massa id neque. Nulla facilisi cras fermentum odio eu feugiat. Tristique magna sit amet purus gravida quis. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Varius quam quisque id diam vel quam."

/** Mock spaces for example dashboard data */
export const MOCK_SPACES: SpaceInfo[] = [{
    id: "12",
    title: "Kenyorgi Dogs",
    desc: "New dog breed discovered in South Kenya",
    images: ["https://images.theconversation.com/files/465656/original/file-20220527-17-9sel6k.jpg?ixlib=rb-1.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"],
    alt: "Photo of 'Kenyorgi' dog"
  },{
    id: "13",
    title: "Google Magi",
    desc: "Google unveils new AI technology to improve search",
    images: ["https://wgmimedia.com/wp-content/uploads/2023/04/Google-Magi.jpg"],
    alt: "Logo of Google Magi"
  }, {
    id: "14",
    title: "Frank Ocean",
    desc: "Frank Ocean stuns Coachella with confusingly pathetic set",
    images: ["https://static.stereogum.com/uploads/2023/04/frank-ocean-coachella-1681738729-1000x750.jpg"],
    alt: "Photo of Frank Ocean concert"
  }];

export const MOCK_CAROUSEL_SLIDES: CarouselSlides[] = [
  {
    id: '0',
    src: 'https://kenyaholidays.travel/wp-content/uploads/2020/08/African-Wild-Dog-portrait.jpg',
    title: 'Kenyorgi dogs',
    subtitle: 'New dog breed discovered in Kenya',
    routerLink: ''
  },
  {
    id: '1',
    src: 'https://i0.wp.com/mpala.org/wp-content/uploads/2020/01/Two-wild-dogs.jpg?fit=739%2C415&ssl=1',
    title: 'Kenyorgi dogs',
    subtitle: 'New dog breed discovered in Kenya',
    routerLink: ''
  },
  {
    id: '2',
    src: 'https://optimise2.assets-servd.host/maniacal-finch/production/animals/painted-dog-01-01.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1658934200&s=81da609829d4362aa959790573f32085',
    title: 'Kenyorgi dogs',
    subtitle: 'New dog breed discovered in Kenya',
    routerLink: ''
  }
]

export const DEFAULT_EMPTY_USER: User = {
  uid: 'DEF',
  email: 'test@test',
  displayName: 'def',
  emailVerified: false
}

// Enum with all currently supported sign in types
export enum AuthTypesEnum {
  EMAIL_PASS = 'email_pass',
  // GOOGLE = 'google',
  // others..
}