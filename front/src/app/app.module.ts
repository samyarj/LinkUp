import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { accessToken } from '../../assets/maps';
import { MatButtonModule } from '@angular/material/button';
import { AuthButtonComponent } from './pages/login-page/auth-button/auth-button.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavigatePageComponent } from './pages/navigate-page/navigate-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CreateEventPageComponent } from './pages/create-event-page/create-event-page.component';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    AuthButtonComponent,
    NavigatePageComponent,
    ProfilePageComponent,
    CreateEventPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NgxMapboxGLModule.withConfig({
      accessToken: accessToken,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAuth0({
      domain: 'dev-8cn4ee7fnjylxcsz.us.auth0.com',
      clientId: 'RLU5dSYynQfFsVWfKtnoBmgpjqug8mEw',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
