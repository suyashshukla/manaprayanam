import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { TripSearchComponent } from './trip-search/trip-search.component';
import { MainComponent } from './main/main.component';
import { environment } from '../environments/environment';
import { SmartSearchComponent } from './smart-search/smart-search.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripListComponent } from './trip-list/trip-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyComponent,
    BottomNavigationComponent,
    TripSearchComponent,
    MainComponent,
    SmartSearchComponent,
    TripDetailComponent,
    TripListComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    NgHttpLoaderModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  providers: [
    AppService
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
