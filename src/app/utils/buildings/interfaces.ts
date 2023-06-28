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

// Chunk of promotional content sourced from an apartment buildings official website
// currently supported types: string
export interface PromoChunk {
  content: string;
  isPlainText: boolean;
  // Whether or not this chunk of content contains practical info about building (as opposed to copy, which would just be fluff)
  hasAmenityInfo: boolean;
}

export interface ApartmentBuilding {
  id: number;
  title?: string;
  address: string;
  buildingType: BuildingTypeEnum;
  subtitle?: string;
  intro: string;
  llmOverview?: string;
  promoChunks?: PromoChunk[];
  amenities: BuildingAmenityTypeEnum[];
  floors: number;
  residents?: number;
  avgRent?: number;
  website?: string;
  images: Image[];
  latLong?: {
    lat: number;
    long: number;
  };
  neighborhood?: string;
  rentStabilized?: boolean;
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

export interface TenantComment {
  id: string;
  authorUserName: string;
  postDate: string;
  content: string;
  avatarUrl: string;
  claps: number;
  currentTenant?: boolean;
}
