import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  const token = auth.tokenSignal();
  const withAuth = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(withAuth).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        auth.clearLocalSession();
        try {
          if (router.url !== '/login') {
            void router.navigateByUrl('/login');
          }
        } catch {}
      }
      
      return throwError(() => error);
    })
  );
};


