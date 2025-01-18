import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { accessToken } from '../../assets/maps';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
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
        redirect_uri: window.location.origin
      }}), 
    provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi())
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
