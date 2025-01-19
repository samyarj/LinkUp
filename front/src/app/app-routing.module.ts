import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NavigatePageComponent } from './pages/navigate-page/navigate-page.component';
import { CreateEventPageComponent } from './pages/create-event-page/create-event-page.component';
import { authGuard } from './auth/auth.guard';
import { PostInfoComponent } from './pages/post-info/post-info.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'navigate', component: NavigatePageComponent, canActivate: [authGuard] },
  { path: 'info/:id', component: PostInfoComponent, canActivate: [authGuard] },
  { path: 'my-profile', component: ProfilePageComponent, canActivate: [authGuard]},
  { path: 'new-event', component: CreateEventPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
