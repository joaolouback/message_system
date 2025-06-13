// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UserData {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserData;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private host = 'http://localhost:3000';
  private storageKey = 'authData';

  constructor(private http: HttpClient) { }

  signUp(
    username: string,
    email: string,
    password: string,
    avatarFile?: File
  ): Observable<AuthResponse> {
    const form = new FormData();
    form.append('username', username);
    form.append('email', email);
    form.append('password', password);
    if (avatarFile) {
      form.append('avatar', avatarFile, avatarFile.name);
    }
    return this.http
      .post<AuthResponse>(`${this.host}/user/signup`, form)
      .pipe(
        tap(res =>
          localStorage.setItem(
            this.storageKey,
            JSON.stringify({ token: res.token, user: res.user })
          )
        )
      );
  }

  signIn(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.host}/user/signin`, { email, password })
      .pipe(
        tap(res =>
          localStorage.setItem(
            this.storageKey,
            JSON.stringify({ token: res.token, user: res.user })
          )
        )
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getAuthData(): { token: string; user: UserData } | null {
    const json = localStorage.getItem(this.storageKey);
    return json ? JSON.parse(json) : null;
  }

  getToken(): string | null {
    const data = this.getAuthData();
    return data?.token ?? null;
  }

  getCurrentUser(): UserData | null {
    const data = this.getAuthData();
    return data?.user ?? null;
  }

  uploadAvatar(file: File): Observable<AuthResponse> {
    const authData = this.getAuthData();
    if (!authData) {
      throw new Error('Usuário não autenticado');
    }
    const form = new FormData();
    form.append('avatar', file, file.name);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authData.token}`
    });
    return this.http
      .put<AuthResponse>(`${this.host}/user/${authData.user.id}/avatar`, form, { headers })
      .pipe(
        tap(res =>
          localStorage.setItem(
            this.storageKey,
            JSON.stringify({ token: res.token, user: res.user })
          )
        )
      );
  }
}
