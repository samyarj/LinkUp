import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-service/profile.service';
import { AppUser } from '../../interfaces/user.interface';
import { Note } from '../../interfaces/note.interface';
import { FriendsService } from '../../services/friends-service/friends.service';

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

  constructor(private profileService: ProfileService, private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.setupdata();
  }

  ngOnDestroy(): void {
  }


  private setupdata(): void {
      this.isFirstLogin = localStorage.getItem('isFirstLogin') === 'true';
      const jUser = localStorage.getItem('user');
      if (jUser) {
        this.user = JSON.parse(jUser);
        console.log(this.user);
        this.getUserById();
      }
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
