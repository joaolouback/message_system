// src/app/messages/message.services.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface Author {
  username: string;
  email: string;
  avatarUrl?: string;
}
export interface Message {
  _id: string;
  content: string;
  author: Author;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private host = 'http://localhost:3000';
  private refreshNeeded = new Subject<void>();

  get refreshNeeded$() {
    return this.refreshNeeded.asObservable();
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get headers(): HttpHeaders {
    const token = this.auth.getToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getMessages(): Observable<{ messages: Message[] }> {
    return this.http.get<{ messages: Message[] }>(
      `${this.host}/messages`
    );
  }

  sendMessage(content: string): Observable<{ message: Message }> {
    return this.http.post<{ message: Message }>(
      `${this.host}/messages`,
      { content },
      { headers: this.headers }
    ).pipe(
      tap(() => this.refreshNeeded.next())
    );
  }

  updateMessage(id: string, content: string): Observable<{ message: Message }> {
    return this.http.put<{ message: Message }>(
      `${this.host}/messages/${id}`,
      { content },
      { headers: this.headers }
    ).pipe(
      tap(() => this.refreshNeeded.next())
    );
  }

  deleteMessage(id: string): Observable<{ message: Message }> {
    return this.http.delete<{ message: Message }>(
      `${this.host}/messages/${id}`,
      { headers: this.headers }
    ).pipe(
      tap(() => this.refreshNeeded.next())
    );
  }
}
