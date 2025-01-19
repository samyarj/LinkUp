import { Component, Input, OnInit } from '@angular/core';
import { FriendsService } from '../../../services/friends-service/friends.service';
import { AppUser } from '../../../interfaces/user.interface';
import { FriendRequest, Status } from '../../../interfaces/friend.interface';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss'
})
export class FriendListComponent  implements OnInit {
  @Input() userId!: string;

  friends: AppUser[] = [];
  friendRequests: FriendRequest[] = [];

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.loadFriends();
    this.loadFriendRequests();
  }

  private loadFriends(): void {
    this.friendsService.getAllFriends(this.userId).subscribe({
      next: (friends) => {
        this.friends = friends;
      },
      error: (err) => {
        console.error('Failed to load friends:', err);
      },
    });
  }

  private loadFriendRequests(): void {
    this.friendsService.consultFriendRequest(this.userId, this.userId).subscribe({
      next: (requests) => {
        this.friendRequests = requests;
      },
      error: (err) => {
        console.error('Failed to load friend requests:', err);
      },
    });
  }

  removeFriend(friendId: string): void {
    this.friendsService.removeFriend(this.userId, friendId).subscribe({
      next: () => {
        this.friends = this.friends.filter((friend) => friend.id !== friendId);
      },
      error: (err) => {
        console.error('Failed to remove friend:', err);
      },
    });
  }

  handleFriendRequest(request: FriendRequest, isAccepted: boolean): void {
    request.status = isAccepted ? Status.ACCEPTED : Status.REJECTED;
    this.friendsService.acceptOrDeclineFriendRequest(request).subscribe({
      next: () => {
        this.friendRequests = this.friendRequests.filter((req) => req !== request);
        if (isAccepted) {
          this.loadFriends();
        }
      },
      error: (err) => {
        console.error('Failed to handle friend request:', err);
      },
    });
  }
}
