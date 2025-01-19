import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
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

  
  constructor(public auth0Service: AuthService, private profileService: ProfileService, private router: Router) {
    console.log('auth service');

    this.auth0Service.idTokenClaims$.subscribe((claims) => {
      console.log('ID Token Claims:', claims);
      
    });
  
    this.auth0Service.getAccessTokenSilently().subscribe((accessToken) => {
      console.log('Access Token:', accessToken);
      localStorage.setItem('accessToken', accessToken);
    });
    this.auth0Service.user$.subscribe(user => {
      console.log('user', user);
      if (user && user.sub) {
        this.profileService.getIfUserExist(user.sub).subscribe({
          next: (user: AppUser) => {
            this.setUser(user);
          },
          error: (error: any) => {
            if (user?.email && user?.sub) {
              this.setUpUser(user);
              localStorage.setItem('isFirstLogin', 'true');
              this.router.navigate(['/profile']);
            }   
          },
        });
      }
    }); 
   }

  public logout() {
    this.auth0Service.logout();
    window.location.href = window.location.origin;
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

  private setUpUser(user: any) {
    const tempUsername = user.email.split('@')[0];
    const userInfo: AppUser = {
      id: user.sub,
      email: user.email,
      description: "",
      isPublic: true,
      username: user.nickname || tempUsername,
    };
    console.log('userInfo', userInfo);
    this.profileService.createUser(userInfo).subscribe({
      next: (user: AppUser) => {
        this.setUser(user);
      },
      error: (error: any) => console.error("Error creating user:", error),
    });
  }

  private setUser(user: AppUser): void {
    if (!user) {
      return;
    }
    this.loggedUser.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.profileService.setUser(user);

  }

}
