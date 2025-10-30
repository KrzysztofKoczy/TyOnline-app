import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData, News, User } from '../model/interfaces';
import { API_URL } from '../model/consts';

@Injectable({ providedIn: 'root' })
export class RestService {
  private httpClient = inject(HttpClient);

  login(data: LoginData): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${API_URL}/login`, data);
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${API_URL}/logout`);
  }

  getCurrentUser(): Observable<Partial<User>> {
    return this.httpClient.get<Partial<User>>(`${API_URL}/login`);
  }

  getNews(): Observable<News[]> {
    return this.httpClient.get<News[]>(`${API_URL}/news`);
  }
}

