import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser } from '../../interfaces/user.interface';
import { FriendRequest } from '../../interfaces/friend.interface';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private baseUrl: string = environment.apiUrl + '/friends';

  constructor(private http: HttpClient) { }

  public getAllFriends(userId: string): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.baseUrl}/${userId}`);
  }

  public removeFriend(userId: string, friendId: string): Observable<AppUser> {
    return this.http.delete<AppUser>(`${this.baseUrl}/${userId}/${friendId}`);
  }

  public addFriend(userId: string, friendId: string): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.baseUrl}/${userId}/${friendId}`, {});
  }

  public consultFriendRequest(userId: string, friendId: string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.baseUrl}/${userId}/${friendId}`);
  }

  public acceptOrDeclineFriendRequest(FriendRequest: FriendRequest): Observable<AppUser> {
    return this.http.patch<AppUser>(`${this.baseUrl}/`, {FriendRequest});
  }

}
