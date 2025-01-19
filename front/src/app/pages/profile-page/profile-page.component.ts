import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-service/profile.service';
import { AppUser } from '../../interfaces/user.interface';
import { Note } from '../../interfaces/note.interface';
import { FriendsService } from '../../services/friends-service/friends.service';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  public user: AppUser = {} as AppUser;
  public friends: AppUser[] = [];
  public myNotes: Note[] = [];
  public isFirstLogin: boolean = false;

  constructor(private profileService: ProfileService, private friendsService: FriendsService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.setupdata();
  }

  ngOnDestroy(): void {
  }


  public handleUserUpdate(updatedUser: AppUser): void {
    this.user = updatedUser;
    this.updateProfile();
  }

  public return(): void {
    this.auth.isFisrtLogin.next(false);
  }
  
  public updateProfile(): void {
    this.profileService.updateUser(this.user).subscribe((user: AppUser) => {
      this.user = user;
      this.auth.isFisrtLogin.next(false);
    });
  }
  
  private setupdata(): void {
      const jUser = localStorage.getItem('user');
      if (jUser) {
        this.user = JSON.parse(jUser);
        console.log(this.user);
        this.getUserById();
      }
      this.auth.isFisrtLogin.subscribe((isFirstLogin) => {
        this.isFirstLogin = isFirstLogin;
      });
  }

  private getUserById(): void {
    this.profileService.getIfUserExist(this.user.id).subscribe((user: AppUser) => {
      this.user = user;
      console.log(this.user);
      this.getAllFriends();
      this.getAllNotes();
    });
  }

  private getAllFriends(): void {
    this.friendsService.getAllFriends(this.user.id).subscribe((friends: AppUser[]) => {
      this.friends = friends;
    });
  }

  private getAllNotes(): void {
    this.profileService.getUserNotes(this.user.id).subscribe((notes: Note[]) => {
      this.myNotes = notes;
    });
  }

}
