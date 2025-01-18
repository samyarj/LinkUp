import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-service/profile.service';
import { AuthService } from '@auth0/auth0-angular';
import { AppUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private user: AppUser = {} as AppUser;

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }


}
