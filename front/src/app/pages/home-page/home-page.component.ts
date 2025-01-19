import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FirstLoginDialogComponent } from './first-login-dialog/first-login-dialog.component';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  public isFirstLogin: boolean = false;
  public isLogged: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  createEvent() {
    this.router.navigate(['/new-event']);
  }

  editProfile() {
    this.router.navigate(['/my-profile']);
  }

  navigate() {
    this.router.navigate(['/navigate']);
  }

  private getData() {
    this.isFirstLogin = localStorage.getItem('isFirstLogin') === 'true';
    if (this.isFirstLogin) {
      this.openFirstLoginDialog();
    }
    this.subcribeToAuth();
  }

  private openFirstLoginDialog(): void {
    this.dialog.open(FirstLoginDialogComponent, {
      disableClose: true,
    });
  }

  private subcribeToAuth(): void {
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isLogged = isAuth;
      console.log('isLogged', this.isLogged);
    });
  
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth) {
        this.auth.auth0Service.user$.subscribe((user) => {
          console.log('Authenticated user:', user);
        });
      }
    });
  }
}