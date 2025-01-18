import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../../interfaces/user.interface';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = environment.apiUrl + '/profile';
  public isFirstLogin: boolean = false;
  public user$: BehaviorSubject<AppUser | null> = new BehaviorSubject<AppUser | null>(null);

  constructor(private http: HttpClient) { }
  
  setUser(user: AppUser): void {
    this.user$.next(user);
  }

  public createUser(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.baseUrl, user);
  }

  public getIfUserExist(userId: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/${userId}`);
  }

  public updateUser(user: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.baseUrl}/${user.id}`, user);
  }

  public getUserNotes(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/posts/${userId}`);
  }

  public getUserEvents(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/events/${userId}`);
  }

  public deleteNoteById(noteId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${noteId}`);
  }
  public deleteEventById(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${eventId}`);
  }
  public createNoteByUser(note: Note): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, note);
  }

  public createEventByUser(event: Note): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, event);
  }

  public updateNoteByUser(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${note.id}`, note);
  }

  public updateEventByUser(event: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${event.id}`, event);
  }

}
