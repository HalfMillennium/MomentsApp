import {
  BuildingSupportStatusEnum,
  BuildingTypeEnum,
  ApplianceEnum,
  BuildingAmenityTypeEnum,
} from './resources';
import { Image } from '../interfaces';

// TODO: Update this object to something that makes more sense
export interface LeasingInfo {
  message: string;
}

export interface ApartmentBuilding {
  id: string;
  title?: string;
  addr: string;
  buildingType: BuildingTypeEnum;
  subtitle?: string;
  desc: string;
  amenities: BuildingAmenityTypeEnum[];
  floors: number;
  residents?: number;
  avg_rent?: number;
  website?: string;
  images: Image[];
  lat_long?: {
    lat: number;
    long: number;
  };
  neigh?: string;
}

export interface ApartmentListing {
  id: string;
  bed: number;
  bath: number;
  sqft?: number | string;
  status: BuildingSupportStatusEnum;
  unit?: string;
  zip?: number;
  leasingInfo?: LeasingInfo;
  amenities: ApplianceEnum[];
  images: string[];
  rent: number;
}
