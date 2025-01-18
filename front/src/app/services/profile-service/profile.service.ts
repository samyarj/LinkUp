import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = environment.apiUrl + '/profile';
  public isFirstLogin: boolean = false;
  public user: AppUser = {} as AppUser;

  constructor(private http: HttpClient) { }

  public createUser(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.baseUrl, user);
  }

  public getIfUserExist(userId: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/${userId}`);
  }

  public updateUser(user: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.baseUrl}/${user.id}`, user);
  }

}
