import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authTokenInterceptor } from './token.interceptor';
import { AuthService } from '../services/auth.service';

describe('authTokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authMock: { tokenSignal: jasmine.Spy; clearLocalSession: jasmine.Spy };
  let routerMock: { url: string; navigateByUrl: jasmine.Spy };

  beforeEach(() => {
    authMock = {
      tokenSignal: jasmine.createSpy('tokenSignal').and.returnValue('qwerty123'),
      clearLocalSession: jasmine.createSpy('clearLocalSession'),
    };
    routerMock = { url: '/news', navigateByUrl: jasmine.createSpy('navigateByUrl') };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add header Authorization, when token exist', () => {
    http.get('/any').subscribe();

    const req = httpMock.expectOne('/any');

    expect(req.request.headers.get('Authorization')).toBe('Bearer qwerty123');

    req.flush({});
  });

  it('should not add heder Authorization, when token don not exist', () => {
    authMock.tokenSignal.and.returnValue(null);
    http.get('/none').subscribe();

    const req = httpMock.expectOne('/none');

    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });

  it('should clear local session and navigate to /login, when error 401', () => {
    http.get('/fail').subscribe({
      error: () => {},
    });

    const req = httpMock.expectOne('/fail');

    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(authMock.clearLocalSession).toHaveBeenCalled();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});


