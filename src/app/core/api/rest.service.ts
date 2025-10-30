import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// move to models
export interface LoginData {
  email: string;
  password: string;
  device: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface User {
  id: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class RestService {
  private httpClient = inject(HttpClient)

  login(data: LoginData): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>('https://test.tyonline.pl/login', data);
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>('https://test.tyonline.pl/logout');
  }

  getCurrentUser(): Observable<Partial<User>> {
    return this.httpClient.get<Partial<User>>('https://test.tyonline.pl/login');
  }

  getNews(): Observable<Array<News>> {
    return this.httpClient.get<Array<News>>('https://test.tyonline.pl/news');
  }
}

