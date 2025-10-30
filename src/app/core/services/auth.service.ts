import { Injectable, computed, signal, inject } from '@angular/core';
import { of, tap, catchError, Observable } from 'rxjs';
import { RestService } from '../api/rest.service';
import { TOKEN_STORAGE_KEY } from '../model/consts';
import { LoginData } from '../model/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly rest = inject(RestService);

  tokenSignal = signal<string | null>(loadToken());

  isAuthenticated = computed(() => !!this.tokenSignal());

  login(data: LoginData): Observable<{ token: string }> {
    return this.rest.login(data).pipe(
      tap((response) => {
        this.setToken(response.token);
      }),
    );
  }

  logout() {
    return this.rest.logout().pipe(
      tap(() => this.clearLocalSession()),
      catchError(() => {
        this.clearLocalSession();
        return of(null);
      })
    );
  }

  clearLocalSession(): void {
    this.setToken(null);
  }

  private setToken(token: string | null): void {
    this.tokenSignal.set(token);

    try {
      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    } catch (error) {
      console.log('Błąd localStorage', error);
    }
  }
}

const loadToken = (): string | null => {
  try { 
    return localStorage.getItem(TOKEN_STORAGE_KEY); 
  } catch { 
    return null; 
  }
};
