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
    return this.http.get<Note[]>(`${this.baseUrl}/${userId}/notes`);
  }

  public getUserEvents(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/${userId}/events`);
  }

  public deleteNoteById(noteId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/notes/${noteId}`);
  }

  public deleteEventById(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/events/${eventId}`);
  }

  public createNoteByUser(note: Note, userId: string): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/${userId}/notes`, note);
  }

  public createEventByUser(event: Note, userId: string): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/${userId}/events`, event);
  }

  public updateNoteByUser(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/notes/${note.id}`, note);
  }

  public updateEventByUser(event: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/events/${event.id}`, event);
  }
}