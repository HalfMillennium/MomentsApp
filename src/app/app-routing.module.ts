import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { Dashboard } from './pages/dashboard/dashboard.component';
import { SpaceDetail } from './pages/space-detail/space-detail.component';
import { Overview } from './pages/overview/overview.component';
import { NewUserConfirmation } from './pages/new-user-confirmation/new-user-confirmation.component';
import { REDUCERS } from './shared/store/reducer';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
    { path: '', component:  Dashboard},
    { 
      path: 'space/:id', 
      component: SpaceDetail
    },
    {
      path: 'info',
      component: Overview
    },
    {
      path: 'welcome-confirmation',
      component: NewUserConfirmation
    }
  ];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }