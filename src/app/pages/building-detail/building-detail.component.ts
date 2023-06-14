import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Params,
  Router,
  RoutesRecognized,
} from '@angular/router';
import {
  ReplaySubject,
  takeUntil,
  tap,
  switchMap,
  of as observableOf,
} from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { ApartmentBuilding } from 'src/app/utils/buildings/interfaces';
import { MOCK_8_SPRUCE_LISTINGS_RECORD } from 'src/app/utils/buildings/resources';
import { CarouselModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'building-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, CarouselModule, RouterModule],
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss'],
})
export class BuildingDetail implements OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  currentBuilding: ApartmentBuilding;
  viewLoaded = false;
  slideIntervalMs = 5000;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const params = this.activatedRoute.snapshot.paramMap;
    // fetch spaceInfo using spaceId - using test data for now
    this.currentBuilding = JSON.parse(
      `${params.get('building')}`
    ) as ApartmentBuilding;
  }

  async ngOnInit(): Promise<void> {
    // fetches space data with API
    fetch(
      `https://jsonplaceholder.typicode.com/todos/${
        this.currentBuilding.id ?? 0
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('API response:', json);
        if (this.currentBuilding) {
          this.currentBuilding.desc = json.title;
        }
      });
    this.viewLoaded = true;
  }

  slideChange($event: any) {
    console.log('Slide changed.');
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
