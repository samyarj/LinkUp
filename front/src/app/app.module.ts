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
import { AuthButtonComponent } from './pages/home-page/auth-button/auth-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FriendListComponent } from './pages/profile-page/friend-list/friend-list.component';
import { MyPostsComponent } from './pages/profile-page/my-posts/my-posts.component';
import { MyProfileComponent } from './pages/profile-page/my-profile/my-profile.component';
import { NavigatePageComponent } from './pages/navigate-page/navigate-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CreateEventPageComponent } from './pages/create-event-page/create-event-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MapSidebarComponent } from './pages/navigate-page/map-sidebar/map-sidebar.component';
import { PopupComponent } from './pages/navigate-page/popup/popup.component';
import { PostInfoComponent } from './pages/post-info/post-info.component';
import { FirstLoginDialogComponent } from './pages/home-page/first-login-dialog/first-login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppAddressAutocompleteComponent } from './pages/create-event-page/address-autocomplete/address-autocomplete.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AuthButtonComponent,
    ProfilePageComponent,
    FriendListComponent,
    MyPostsComponent,
    MyProfileComponent,
    NavigatePageComponent,
    CreateEventPageComponent,
    MapSidebarComponent,
    PopupComponent,
    PostInfoComponent,
    FirstLoginDialogComponent,
    AppAddressAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    NgxMapboxGLModule.withConfig({
      accessToken: accessToken,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAuth0({
      domain: 'dev-jgqogccadnvx5p03.us.auth0.com',
      clientId: 'fKQy2WvuwvR2DQjRemBfXmPhEidnVkFK',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://dev-jgqogccadnvx5p03.us.auth0.com/api/v2/",
      },
    }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
