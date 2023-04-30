import { Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import { ReplaySubject, takeUntil, tap, switchMap, of as observableOf} from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { SpaceInfo } from 'src/app/utils/interfaces';
import {TEST_API_RESPONSE} from 'src/app/utils/resources';

@Component({
  selector: 'space-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './space-detail.component.html',
  styleUrls: ['./space-detail.component.scss']
})
export class SpaceDetail implements OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  currentSpace: SpaceInfo;
  viewLoaded = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const params = this.activatedRoute.snapshot.paramMap;
    const spaceId = params.get('id');
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

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
