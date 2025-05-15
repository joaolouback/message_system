// src/app/preferences/preferences.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Preference {
    _id: string;
    user: string;
    theme: 'light' | 'dark';
    notification: 'email' | 'sms';
    newsletter: boolean;
    createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PreferencesService {
    private host = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    save(pref: {
        user: string;
        theme: 'light' | 'dark';
        notification: 'email' | 'sms';
        newsletter: boolean;
    }): Observable<{ preference: Preference }> {
        return this.http.post<{ preference: Preference }>(
            `${this.host}/preferences`,
            pref
        );
    }

    list(userId: string): Observable<{ preferences: Preference[] }> {
        return this.http.get<{ preferences: Preference[] }>(
            `${this.host}/preferences/${userId}`
        );
    }
}
