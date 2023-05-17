import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { Dashboard } from './pages/dashboard/dashboard.component';
import { SpaceDetail } from './pages/space-detail/space-detail.component';
import { Overview } from './pages/overview/overview.component';
import { NewUserConfirmation } from './pages/new-user-confirmation/new-user-confirmation.component';
import { AuthCredentialPipe } from './utils/pipes/auth-credential.pipe';
import { UserNamePipe } from './utils/pipes/user-name.pipe';

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
  imports: [
    AuthCredentialPipe,
    UserNamePipe,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }