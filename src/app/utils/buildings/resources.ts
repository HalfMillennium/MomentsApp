import { BuildingDetailChunk } from '../interfaces';
import { ApartmentBuilding, TenantComment } from './interfaces';
import { ApartmentListing } from './interfaces';

export enum BuildingSupportStatusEnum {
  SUPPORTED = 'SUPPORTED',
  UNSUPPORTED = 'UNSUPPORTED',
  UNKNOWN = 'UNKOWN',
}

export enum BuildingTypeEnum {
  LUXURY = 'luxury',
  STANDARD = 'standard',
}

interface BuildingTypeEntity {
  name: string;
  icon: string;
}

export const BUILDING_TYPE: Record<BuildingTypeEnum, BuildingTypeEntity> = {
  [BuildingTypeEnum.LUXURY]: {
    name: 'Luxury Building',
    icon: 'attach_money',
  },
  [BuildingTypeEnum.STANDARD]: {
    name: 'Standard Building',
    icon: 'corporate_fare',
  },
};

export enum BuildingAmenityTypeEnum {
  LAUNDRY_IN_BUILDING = 'Laundry, In-Building',
  POOL = 'Pool',
  DOORMAN = 'Doorman',
  ELEVATOR = 'Elevator',
  TERRACE = 'Terrace',
  REFUSE_EACH_FLOOR = 'Refuse room, each floor',
  GYM = 'Gym',
  REC_AREA = 'Recreational area(s)',
}

export const BUILDING_AMENITY_ICONS: Record<BuildingAmenityTypeEnum, string> = {
  [BuildingAmenityTypeEnum.DOORMAN]: 'man',
  [BuildingAmenityTypeEnum.ELEVATOR]: 'elevator',
  [BuildingAmenityTypeEnum.GYM]: 'fitness_center',
  [BuildingAmenityTypeEnum.LAUNDRY_IN_BUILDING]: 'local_laundry_service',
  [BuildingAmenityTypeEnum.REFUSE_EACH_FLOOR]: 'delete',
  [BuildingAmenityTypeEnum.REC_AREA]: 'sports_basketball',
  [BuildingAmenityTypeEnum.TERRACE]: 'deck',
  [BuildingAmenityTypeEnum.POOL]: 'pool',
};

export const MOCK_8_SPRUCE_BUILDING: ApartmentBuilding = {
  id: 34,
  title: '8 Spruce',
  address: '8 Spruce St. New York, NY',
  buildingType: BuildingTypeEnum.LUXURY,
  intro:
    "This looks like it's a very nice building, with lots of very modern amenities.",
  promoChunks: [
    {
      content:
        "This looks like it's a very nice building, with lots of very modern amenities.",
      isPlainText: true,
      hasAmenityInfo: false,
    },
  ],
  images: [
    {
      url: 'https://images1.apartments.com/i2/z39DCbthQ4Zi7UBPImhsnKop55hqSs_C6EmQEgpnf5A/111/8-spruce-new-york-ny-primary-photo.jpg',
      alt: 'View from inside apartment',
    },
  ],
  floors: 76,
  amenities: [
    BuildingAmenityTypeEnum.ELEVATOR,
    BuildingAmenityTypeEnum.GYM,
    BuildingAmenityTypeEnum.LAUNDRY_IN_BUILDING,
    BuildingAmenityTypeEnum.REC_AREA,
    BuildingAmenityTypeEnum.REFUSE_EACH_FLOOR,
    BuildingAmenityTypeEnum.TERRACE,
  ],
  website: 'https://live8spruce.com/',
  neighborhood: 'Financial District',
  rentStabilized: true,
};

/** Mock buildings for example dashboard data */
export const MOCK_BUILDINGS: ApartmentBuilding[] = [
  {
    id: 31,
    title: '360 West',
    address: '360 West 43rd St, New York, NY 10036',
    buildingType: BuildingTypeEnum.LUXURY,
    intro: 'Classic brick building located near the heart of Times Square.',
    promoChunks: [
      {
        content:
          'Classic brick building located near the heart of Times Square.',
        isPlainText: true,
        hasAmenityInfo: false,
      },
    ],
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
      BuildingAmenityTypeEnum.TERRACE,
    ],
  },
  {
    id: 32,
    title: 'The Landon',
    address: '520 West 43rd St, New York, NY 10036',
    intro:
      'Modern full-service building located near the Westside Highway and the historic Pier 76.',
    promoChunks: [
      {
        content:
          'Modern full-service building located near the Westside Highway and the historic Pier 76.',
        isPlainText: true,
        hasAmenityInfo: false,
      },
    ],
    buildingType: BuildingTypeEnum.LUXURY,
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
      BuildingAmenityTypeEnum.POOL,
      BuildingAmenityTypeEnum.TERRACE,
      BuildingAmenityTypeEnum.REC_AREA,
    ],
  },
  {
    id: 34,
    title: '8 Spruce',
    address: '8 Spruce St. New York, NY',
    buildingType: BuildingTypeEnum.LUXURY,
    intro:
      "This looks like it's a very nice building, with lots of very modern amenities.",
    promoChunks: [
      {
        content:
          "This looks like it's a very nice building, with lots of very modern amenities.",
        isPlainText: true,
        hasAmenityInfo: false,
      },
    ],
    images: [
      {
        url: 'https://images1.apartments.com/i2/z39DCbthQ4Zi7UBPImhsnKop55hqSs_C6EmQEgpnf5A/111/8-spruce-new-york-ny-primary-photo.jpg',
        alt: 'View from inside apartment',
      },
    ],
    floors: 45,
    amenities: [
      BuildingAmenityTypeEnum.ELEVATOR,
      BuildingAmenityTypeEnum.GYM,
      BuildingAmenityTypeEnum.LAUNDRY_IN_BUILDING,
    ],
  },
];

// i.e., in-unit washer dryer, dishwasher, stove
export enum ApplianceEnum {
  DISHWASHER = 'dishwasher',
  W_D = 'washer_dryer',
  AC = 'air_conditioning',
  HEAT = 'heat',
  COMPACT = 'compact',
  STOVE = 'stove',
}

export const MOCK_8_SPRUCE_LISTINGS_RECORD: Record<string, ApartmentListing> = {
  '1': {
    id: '1',
    bed: 1,
    bath: 1.5,
    sqft: 550,
    status: BuildingSupportStatusEnum.SUPPORTED,
    unit: 'N10P',
    zip: 10000,
    leasingInfo: {
      message: 'No leasing info available at this time.',
    },
    amenities: [],
    images: [
      'https://www.compass.com/m/462167360d5a28158506382b9f4608242e0bad90_img_0_36a08/origin.jpg',
      'https://www.compass.com/m/462167360d5a28158506382b9f4608242e0bad90_img_0_36a08/1500x1000.webp',
      'https://www.compass.com/m/462167360d5a28158506382b9f4608242e0bad90_img_1_8beaf/1500x1000.webp',
    ],
    rent: 4700,
  },
  '2': {
    id: '2',
    bed: 2,
    bath: 2,
    sqft: 750,
    status: BuildingSupportStatusEnum.SUPPORTED,
    unit: 'C19K',
    zip: 10001,
    leasingInfo: {
      message: 'No leasing info available at this time.',
    },
    amenities: [],
    images: [
      'https://imgs.6sqft.com/wp-content/uploads/2017/10/03122539/8-Spruce-Street-PH-N-2.jpg',
      'https://imgs.6sqft.com/wp-content/uploads/2017/10/03122815/8-Spruce-Street-PH-N-8.jpg',
      'https://imgs.6sqft.com/wp-content/uploads/2017/10/03122749/8-Spruce-Street-PH-N-7.jpg',
    ],
    rent: 3100,
  },
  '3': {
    id: '3',
    bed: 1,
    bath: 2,
    sqft: 1050,
    status: BuildingSupportStatusEnum.SUPPORTED,
    unit: '11P',
    zip: 10002,
    leasingInfo: {
      message: 'No leasing info available at this time.',
    },
    amenities: [],
    images: [
      'https://www.nynesting.com/sites/default/files/new_york_by_gehry_-_8_spruce_street_06.jpg',
      'https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/91640ce02bd654ebb20d12b96f614c73-full.jpg',
      'https://images.realty.mx/d36583d5d740bd857dcd09a5f4eec6b4/images/assets/131189_735961.JPG',
    ],
    rent: 2800,
  },
};

export const MOCK_8_SPRUCE_DETAIL_CHUNKS: BuildingDetailChunk[] = [
  {
    plainText:
      'This is example of first plainText. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi porta lorem mollis aliquam. Urna molestie at elementum eu facilisis. Interdum varius sit amet mattis vulputate enim nulla aliquet. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Ut tellus elementum sagittis vitae et leo duis. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Sapien pellentesque habitant morbi tristique. Cras fermentum odio eu feugiat pretium nibh ipsum. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Molestie ac feugiat sed lectus vestibulum mattis.',
    image: {
      url: 'https://imgs.6sqft.com/wp-content/uploads/2017/10/03122815/8-Spruce-Street-PH-N-8.jpg',
      alt: 'This is an example of first alt text',
    },
    title: 'Overview',
    direction: 'right-text',
    googleIcon: 'auto_awesome',
  },
  {
    plainText:
      'This is a second example plainText. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Arcu felis bibendum ut tristique. Molestie at elementum eu facilisis sed odio. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Cras tincidunt lobortis feugiat vivamus at. Magna sit amet purus gravida quis. Etiam non quam lacus suspendisse faucibus interdum. Malesuada nunc vel risus commodo viverra. In eu mi bibendum neque. Id leo in vitae turpis massa sed elementum tempus egestas. Pellentesque adipiscing commodo elit at imperdiet dui. Vitae suscipit tellus mauris a diam. Arcu non odio euismod lacinia at quis risus. Facilisis volutpat est velit egestas dui id ornare arcu. Ornare massa eget egestas purus viverra accumsan in.',
    image: {
      url: 'https://www.live8spruce.com/media/povbcomt/8-spruce-amenity-1-1000_750.jpg?width=1380&height=760&rnd=133257616512070000',
      alt: 'This is an example of second alt text',
    },
    title: 'Amenities',
    googleIcon: 'local_bar',
    direction: 'left-text',
    amenities: Object.values(BuildingAmenityTypeEnum),
    amenityList: true,
  },
];

export const MOCK_8_SPRUCE_TENANT_COMMENTS: TenantComment[] = [
  {
    id: '0',
    authorUserName: 'MrShock17',
    postDate: 'June 23rd, 2023',
    content:
      'Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Arcu felis bibendum ut tristique. Molestie at elementum eu facilisis sed odio. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Cras tincidunt lobortis feugiat vivamus at. Magna sit amet purus gravida quis. Etiam non quam lacus suspendisse faucibus interdum. Malesuada nunc vel risus commodo viverra.',
    avatarUrl:
      'https://brobible.com/wp-content/uploads/2019/09/dennis-reynolds.jpg',
    claps: 156,
  },
  {
    id: '0',
    authorUserName: 'MrShock17',
    postDate: 'April 12th, 2022',
    content:
      'Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Cras tincidunt lobortis feugiat vivamus at. Magna sit amet purus gravida quis. Etiam non quam lacus suspendisse faucibus interdum. Malesuada nunc vel risus commodo viverra.',
    avatarUrl:
      'https://brobible.com/wp-content/uploads/2019/09/dennis-reynolds.jpg',
    claps: 156,
    currentTenant: true,
  },
];

// Indicates how a user has interacted with a particular listing (e.g. Favorite, Watched, etc)
export enum UserInteractionTypeEnum {
  FAVORITED = 'favorited',
  WATCHING = 'watching',
  VISITED = 'visited',
  LIVED_IN = 'lived_in',
}
