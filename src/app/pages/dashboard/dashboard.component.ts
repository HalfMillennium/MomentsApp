import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../material.module';
import { SpaceInfo } from '../../utils/interfaces';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class Dashboard {
  constructor(private router: Router) {}
  mockSpaces: SpaceInfo[] = [{
    id: "12",
    title: "Kenyorgi Dogs",
    desc: "New dog breed discovered in South Kenya",
    images: ["https://images.theconversation.com/files/465656/original/file-20220527-17-9sel6k.jpg?ixlib=rb-1.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"],
    alt: "Photo of 'Kenyorgi' dog"
  },{
    id: "13",
    title: "Google Magi",
    desc: "Google unveils new AI technology to improve search",
    images: ["https://wgmimedia.com/wp-content/uploads/2023/04/Google-Magi.jpg"],
    alt: "Logo of Google Magi"
  }, {
    id: "14",
    title: "Frank Ocean",
    desc: "Frank Ocean stuns Coachella with confusingly pathetic set",
    images: ["https://static.stereogum.com/uploads/2023/04/frank-ocean-coachella-1681738729-1000x750.jpg"],
    alt: "Photo of Frank Ocean concert"
  }];
}