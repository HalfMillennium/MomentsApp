import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { Overview } from './pages/overview/overview.component';
import { MatDialogModule } from '@angular/material/dialog';
// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthCredentialPipe } from './utils/pipes/auth-credential.pipe';
import { UserNamePipe } from './utils/pipes/user-name.pipe';
import { APP_REDUCERS, APP_EFFECTS } from './utils/resources';
import { FirebaseAuthService } from './shared/auth/service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    Dashboard,
    MaterialModule,
    AppRoutingModule,
    Overview,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AuthCredentialPipe,
    UserNamePipe,
    StoreModule.forRoot(APP_REDUCERS),
    EffectsModule.forRoot(APP_EFFECTS),
  ],
  bootstrap: [AppComponent],
  providers: [FirebaseAuthService],
})
export class AppModule {}
