import { Path } from './interfaces';
import { PathTypeDetails } from './interfaces';
export const TEST_SAVED_PATHS: Path[] = [
  { name: 'Home to Work (Summer)' },
  { name: "Home to John's Place" },
  { name: 'Work to Lunch spot' },
  { name: 'Home to Movie theatre' },
];

export enum PathType {
  WORK_COMMUTE = 'Work',
  SCHOOL_COMMUTE = 'School',
  SHOPPING_COMMUTE = 'Shopping',
  FRIEND_COMMUTE = 'Friends',
  SCENIC_ROUTE = 'Scenic',
}

export const PathTypeRecord: Record<PathType, PathTypeDetails> = {
  [PathType.WORK_COMMUTE]: {
    displayName: PathType.WORK_COMMUTE,
    icon: 'work',
  },
  [PathType.SCHOOL_COMMUTE]: {
    displayName: PathType.SCHOOL_COMMUTE,
    icon: 'school',
  },
  [PathType.SHOPPING_COMMUTE]: {
    displayName: PathType.SHOPPING_COMMUTE,
    icon: 'shopping_bag',
  },
  [PathType.FRIEND_COMMUTE]: {
    displayName: PathType.FRIEND_COMMUTE,
    icon: 'diversity_3',
  },
  [PathType.SCENIC_ROUTE]: {
    displayName: PathType.SCENIC_ROUTE,
    icon: 'wallpaper',
  },
};
