import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AppUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { ProfileService } from '../profile-service/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedUser: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>({} as AppUser);
  public isAuthentificated: boolean = false;

  get isAuthenticated$() {
    return this.auth0Service.isAuthenticated$;
  }

  get loggedUser$(): Observable<AppUser> {
    return this.loggedUser.asObservable();
  }
  
  constructor(private auth0Service: AuthService, private profileService: ProfileService, private router: Router) {
    this.auth0Service.user$.subscribe(user => {
      if (user?.email && user?.sub) {
        const tempUsername = user.email.split('@')[0];
        const userInfo: AppUser = {
          auth0Id: user.sub,
          email: user.email,
          description: "",
          isProfilePublic: true,
          username: user.nickname || tempUsername,
        };
        this.profileService.createUserIfDontExist(userInfo).subscribe({
          next: (user: AppUser) => {
            this.loggedUser.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          },
          error: (error: any) => console.error("Error creating user:", error),
        });
      }
    });
    
   }

  public logout() {
    this.auth0Service.logout();
    window.location.href = window.location.origin;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedUser.next({} as AppUser);
  }


  public getStoredUser(): AppUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  public getUser(): AppUser | null {
    if (this.loggedUser.value) {
      return this.loggedUser.value;
    }
    return this.getStoredUser();
  }

  public updateLoggedUserInfo(user: AppUser): void {
    this.loggedUser.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public handleUnAuthorizedUser(): void {
    if (!this.isAuthenticated$) {
      this.router.navigate(['/register']);
    }
  }

}
