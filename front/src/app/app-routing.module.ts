import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavigatePageComponent } from './pages/navigate-page/navigate-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'navigate', component: NavigatePageComponent },
  { path: 'my-profile', component: ProfilePageComponent },
  { path: 'create-event', component: EventPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
