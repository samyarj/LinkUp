import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Note } from '../../interfaces/note.interface';
import { Message } from '../../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/posts';

  constructor(private http: HttpClient) { }

  public getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  public getMyFriendsNotes(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/friends/${userId}`);
  }

  public getMyFriendsEvents(userId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/events/friends/${userId}`);
  }

  public getAllEvents(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  public addCommentToNoteById(noteId: string, comment: Message): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/${noteId}/comment`, {comment});
  }

  public addCommentToEventById(eventId: string, comment: Message): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/${eventId}/comment`, {comment});
  }
}
