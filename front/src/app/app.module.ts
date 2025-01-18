import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavigatePageComponent } from './pages/navigate-page/navigate-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigatePageComponent,
    ProfilePageComponent,
    EventPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
