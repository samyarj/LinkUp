import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Note } from '../../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/friends';

  constructor(private http: HttpClient) { }

  public getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  public getAllEvents(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  public addCommentToNoteById(noteId: string, comment: string): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/${noteId}/comment`, {comment});
  }

  public addCommentToEventById(eventId: string, comment: string): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/${eventId}/comment`, {comment});
  }

}
