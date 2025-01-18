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

  constructor(private profileService: ProfileService, private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.setupdata();
  }

  ngOnDestroy(): void {
  }


  private setupdata(): void {
    this.profileService.user$.subscribe((user: AppUser | null) => {
      if(user) {
        this.user = user;
        this.getAllFriends();
      }
    });
  }


  private getAllFriends(): void {
    this.friendsService.getAllFriends(this.user.id).subscribe((friends: AppUser[]) => {
      this.friends = friends;
    });
  }

}
