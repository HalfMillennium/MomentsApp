import { Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import { ReplaySubject, takeUntil, tap, switchMap, of as observableOf} from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { SpaceInfo } from 'src/app/utils/interfaces';
import {TEST_API_RESPONSE, MOCK_CAROUSEL_SLIDES} from 'src/app/utils/resources';
import { CarouselModule } from '@coreui/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'space-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, CarouselModule, RouterModule],
  templateUrl: './space-detail.component.html',
  styleUrls: ['./space-detail.component.scss']
})
export class SpaceDetail implements OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  currentSpace: SpaceInfo;
  viewLoaded = false;
  readonly MOCK_CAROUSEL_SLIDES = MOCK_CAROUSEL_SLIDES;
  slideIntervalMs = 5000;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const params = this.activatedRoute.snapshot.paramMap;
    // fetch spaceInfo using spaceId - using test data for now
    this.currentSpace = {
      id: params.get('id'),
      title: TEST_API_RESPONSE['title'],
      images: [TEST_API_RESPONSE['image']],
      alt: TEST_API_RESPONSE['alt']
    }
  }

  async ngOnInit(): Promise<void> {
    // fetches space data with API
    fetch(`https://jsonplaceholder.typicode.com/todos/${this.currentSpace.id ?? 0}`)
      .then(response => response.json())
      .then(json => {
        console.log("API response:",json);
        if(this.currentSpace) {
          this.currentSpace.desc = json.title;
        }
      })
    this.viewLoaded = true;
  }

  slideChange($event: any) {
    console.log("Slide changed.");
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
