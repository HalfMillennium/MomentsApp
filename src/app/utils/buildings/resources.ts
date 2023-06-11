import { ApartmentBuilding } from '../interfaces';

//
export enum BuildingStatus {
  SUPPORTED = 'SUPPORTED',
  UNSUPPORTED = 'UNSUPPORTED',
  UNKNOWN = 'UNKOWN',
}

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

/** Mock buildings for example dashboard data */
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
    id: '12',
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
  {
    id: '14',
    title: '8 Spruce',
    addr: '8 Spruce St. New York, NY',
    desc: "This looks like it's a very nice building, with lots of very modern amenities.",
    images: [
      {
        url: 'https://images1.apartments.com/i2/z39DCbthQ4Zi7UBPImhsnKop55hqSs_C6EmQEgpnf5A/111/8-spruce-new-york-ny-primary-photo.jpg',
        alt: 'View from inside apartment',
      },
    ],
    floors: 45,
    amenities: [
      BuildingAmenityTypeEnum.ELEVATOR,
      BuildingAmenityTypeEnum.FULL_TIME_DOORMAN,
      BuildingAmenityTypeEnum.GYM,
      BuildingAmenityTypeEnum.LAUNDRY_IN_UNIT,
    ],
  },
];

// i.e., in-unit washer dryer, dishwasher, stove
export enum Appliance {
  DISHWASHER = 'dishwasher',
  W_D = 'washer_dryer',
  AC = 'air_conditioning',
  HEAT = 'heat',
  COMPACT = 'compact',
  STOVE = 'stove',
}

// TODO: Update this object to something that makes more sense
export interface LeasingInfo {
  message: string;
}

export interface ApartmentListing {
  bed: number;
  bath: number;
  sqft?: number | string;
  status: BuildingStatus;
  unit?: string;
  zip?: number;
  leasingInfo?: LeasingInfo;
  amenities: Appliance[];
  images: string[];
}

export const MOCK_8_SPRUCE_LISTINGS: ApartmentListing[] = [
  {
    bed: 1,
    bath: 1.5,
    sqft: 550,
    status: BuildingStatus.SUPPORTED,
    unit: 'N10P',
    zip: 10000,
    leasingInfo: {
      message: 'No leasing info available at this time.',
    },
    amenities: [],
    images: [],
  },
  {
    bed: 2,
    bath: 2,
    sqft: 750,
    status: BuildingStatus.SUPPORTED,
    unit: 'C19K',
    zip: 10001,
    leasingInfo: {
      message: 'No leasing info available at this time.',
    },
    amenities: [],
    images: [],
  },
  {
    bed: 1,
    bath: 2,
    sqft: 1050,
    status: BuildingStatus.SUPPORTED,
    unit: 'P10P',
    zip: 10002,
    leasingInfo: {
      message: 'No leasing info available at this time.',
    },
    amenities: [],
    images: [],
  },
];
