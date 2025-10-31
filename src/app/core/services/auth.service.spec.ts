import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { RestService } from '../api/rest.service';
import { TOKEN_STORAGE_KEY } from '../model/consts';

describe('AuthService', () => {
  let service: AuthService;
  let restSpy: jasmine.SpyObj<RestService>;

  beforeEach(() => {
    restSpy = jasmine.createSpyObj('RestService', ['login', 'logout']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: RestService, useValue: restSpy }],
    });

    service = TestBed.inject(AuthService);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  });

  it('should set token and isAuthenticated on true', (done) => {
    restSpy.login.and.returnValue(of({ token: 'abc123' }));

    service
      .login({ email: 'user@example.com', password: 'pass123', device: 'Chrome' })
      .subscribe({
        next: () => {
          expect(service.tokenSignal()).toBe('abc123');
          expect(service.isAuthenticated()).toBeTrue();
          expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe('abc123');
          done();
        },
      });
  });

  it('should clear session', (done) => {
    restSpy.login.and.returnValue(of({ token: 'abc123' }));
    service
      .login({ email: 'user@example.com', password: 'pass123', device: 'Chrome' })
      .subscribe(() => {
        restSpy.logout.and.returnValue(of(void 0));

        service.logout().subscribe({
          complete: () => {
            expect(service.tokenSignal()).toBeNull();
            expect(service.isAuthenticated()).toBeFalse();
            expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
            done();
          },
        });
      });
  });

  it('should clear token and localStorage', () => {
    localStorage.setItem(TOKEN_STORAGE_KEY, 'abc123');
    service.tokenSignal.set('abc123');

    service.clearLocalSession();

    expect(service.tokenSignal()).toBeNull();
    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
  });
});


