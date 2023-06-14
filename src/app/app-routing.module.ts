import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { Dashboard } from './pages/dashboard/dashboard.component';
import { BuildingDetail } from './pages/building-detail/building-detail.component';
import { Overview } from './pages/overview/overview.component';
import { AuthCredentialPipe } from './utils/pipes/auth-credential.pipe';
import { CookieService } from 'ngx-cookie-service';
import { BuildingListingsComponent } from './pages/building-listings/building-listings.component';

const routes: Routes = [
  { path: '', component: Dashboard },
  {
    path: 'building/:id',
    component: BuildingListingsComponent,
  },
  {
    path: 'info',
    component: Overview,
  },
];
// configures NgModule imports and exports
@NgModule({
  imports: [AuthCredentialPipe, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CookieService],
})
export class AppRoutingModule {}
