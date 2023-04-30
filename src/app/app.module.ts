import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { Overview } from './pages/overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    Dashboard,
    MaterialModule,
    AppRoutingModule,
    Overview
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
