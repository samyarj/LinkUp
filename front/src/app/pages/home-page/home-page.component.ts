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
  public userId: string | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  createEvent() {
    if (this.userId) {
      this.router.navigate([`/new-event/${this.userId}`]);
    } else {
      alert('You need to be logged in to create an event');
    }
  }

  editProfile() {
    console.log('User ID:', this.userId);
    if (this.userId) {
      this.router.navigate([`/my-profile/${this.userId}`]);
    } else {
      alert('You need to be logged in to edit your profile');
    }
  }

  navigate() {
    if (this.userId) {
      this.router.navigate([`/navigate/${this.userId}`]);
    } else {
      alert('You need to be logged in to navigate');
    }
  }

  private getData() {
    this.auth.loggedUser.subscribe((user) => {
      this.userId = user.id
    }
    );
    this.auth.isFisrtLogin.subscribe((isFirstLogin) => {
      this.isFirstLogin = isFirstLogin;
      if (this.isFirstLogin) {
        this.openFirstLoginDialog();
      }
      this.subcribeToAuth();
    });
  }

  private openFirstLoginDialog(): void {
    this.dialog.open(FirstLoginDialogComponent, {
      disableClose: true,
    });
  }

  private subcribeToAuth(): void {
    this.userId = this.auth.getStoredUser()?.id || null;
    this.auth.loggedUser$.subscribe((user) => {
      console.log('User:', user);
      this.isLogged = !!user.id;
      this.userId = user.id;
    });
  }
}