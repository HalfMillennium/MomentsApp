import { Component, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject, of as observableOf } from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { ApartmentBuilding } from 'src/app/utils/buildings/interfaces';
import { CarouselModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { TwoPanelContainerComponent } from '../components/two-panel-container/two-panel-container.component';
import { BuildingDetailChunk } from 'src/app/utils/interfaces';
import {
  MOCK_8_SPRUCE_DETAIL_CHUNKS,
  UserInteractionTypeEnum,
} from '../../utils/buildings/resources';

@Component({
  selector: 'building-detail',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CarouselModule,
    RouterModule,
    TwoPanelContainerComponent,
  ],
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss'],
})
export class BuildingDetail implements OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  readonly UserInteractionTypeEnum = UserInteractionTypeEnum;

  @Input() currentBuilding?: ApartmentBuilding;

  buildingDetailChunks: BuildingDetailChunk[] = MOCK_8_SPRUCE_DETAIL_CHUNKS;

  // Set of user interactions currently applicable to this building
  userInteractions: Observable<UserInteractionTypeEnum[]> = observableOf([
    UserInteractionTypeEnum.WATCHING,
  ]);

  viewLoaded = false;
  slideIntervalMs = 5000;

  async ngOnInit(): Promise<void> {
    await this.fetchData(2);
    this.viewLoaded = true;
  }

  async fetchData(iterations: number = 1) {
    for (let i = 1; i <= iterations; i++) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
        .then((response) => response.json())
        .then((json) => {
          console.log('API response:', json);
          if (this.currentBuilding) {
            this.currentBuilding.intro =
              this.currentBuilding.intro + '\n\n' + json.body;
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
