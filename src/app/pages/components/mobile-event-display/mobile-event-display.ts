import { Component, Input } from '@angular/core';
import {
  MobileEvent,
  MobileEventType,
} from 'src/app/utils/mobile-events/resources';

@Component({
  selector: 'mobile-event-display',
  templateUrl: './mobile-event-display.component.html',
  styleUrls: ['./mobile-event-display.component.scss'],
})
export class LocationActivityDisplay {
  @Input() mobileEvents: MobileEvent[] = [
    // TODO: Add neighborhood enum type to MobileEvent type
    {
      type: MobileEventType.DISCOVER_BUILDING,
      dateTime: 'August 12th, 2023, 3:00PM EST',
      location: 'Hudson Yards',
    },
    {
      type: MobileEventType.ADD_FAVORITE_BUILDING,
      dateTime: 'August 12th, 2023, 3:10PM EST',
      location: 'Hudson Yards',
    },
    {
      type: MobileEventType.ADD_FAVORITE_BUILDING,
      dateTime: 'August 16th, 2023, 7:10PM EST',
      location: 'Downtown Brooklyn',
    },
    {
      type: MobileEventType.ADD_FAVORITE_BUILDING,
      dateTime: 'August 16th, 2023, 7:10PM EST',
      location: 'Fort Greene',
    },
    {
      type: MobileEventType.REMOVE_FAVORITE_BUILDING,
      dateTime: 'August 16th, 2023, 9:22PM EST',
      location: 'Fort Greene',
    },
    {
      type: MobileEventType.FORGET_BUILDING,
      dateTime: 'August 17th, 2023, 2:13PM EST',
      location: 'Fort Greene',
    },
    {
      type: MobileEventType.DISCOVER_BUILDING,
      dateTime: 'September 1st, 2023, 1:45PM EST',
      location: 'Times Square',
    },
  ];
}
