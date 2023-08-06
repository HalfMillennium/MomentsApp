export enum MobileEventType {
  DISCOVER_BUILDING = 'Discovery',
  FORGET_BUILDING = 'Forgotten',
  ADD_FAVORITE_BUILDING = 'Favorite',
  REMOVE_FAVORITE_BUILDING = 'Unfavorite',
}

/** Type for MobileEvent */
export declare interface MobileEvent {
  id?: string;
  type: MobileEventType;
  dateTime: string;
  location: string;
}
