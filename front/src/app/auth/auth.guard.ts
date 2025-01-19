import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        router.navigate(['/home']);
      }
      return isAuthenticated;
    })
  );};
