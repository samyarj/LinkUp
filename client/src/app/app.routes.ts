import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  { path: 'navigate', redirectTo: '/home', pathMatch: 'full' },
  { path: 'setup-profile', redirectTo: '/home', pathMatch: 'full' },
  { path: 'create-event', redirectTo: '/home', pathMatch: 'full' },
];
