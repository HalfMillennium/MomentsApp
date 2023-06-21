import { Component, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { MaterialModule } from 'src/material.module';
import { ApartmentBuilding } from 'src/app/utils/buildings/interfaces';
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

  @Input() currentBuilding: ApartmentBuilding;

  viewLoaded = false;
  slideIntervalMs = 5000;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    const params = this.activatedRoute.snapshot.paramMap;
    this.currentBuilding = JSON.parse(
      `${params.get('building')}`
    ) as ApartmentBuilding;
  }

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

  slideChange($event: any) {
    console.log('Slide changed.');
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
