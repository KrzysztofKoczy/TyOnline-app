import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { authGuard, redirectLoggedInGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('Guards: authGuard & redirectLoggedInGuard', () => {
  let router: Router;
  let authStub: { isAuthenticated: () => boolean };

  beforeEach(() => {
    authStub = { isAuthenticated: () => false };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authStub }],
    });

    router = TestBed.inject(Router);
  });

  it('should allows, and redirects to /news when logged in', () => {
    authStub.isAuthenticated = () => true;

    const result = TestBed.runInInjectionContext(() => redirectLoggedInGuard({} as any, {} as any));

    expect(result instanceof UrlTree).toBeTrue();

    const serialized = router.serializeUrl(result as UrlTree);

    expect(serialized).toBe('/news');
  });

  it('should redirect to /login, when  gdy not logged in', () => {
    authStub.isAuthenticated = () => false;

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result instanceof UrlTree).toBeTrue();

    const serialized = router.serializeUrl(result as UrlTree);

    expect(serialized).toBe('/login');
  });
});


