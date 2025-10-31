import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { AppHeader } from './app-header';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../api/rest.service';
import { Router } from '@angular/router';

describe('AppHeader', () => {
  let fixture: ComponentFixture<AppHeader>;
  let component: AppHeader;
  let authMock: { logout: jasmine.Spy };
  let restMock: { getCurrentUser: jasmine.Spy };
  let routerMock: { navigateByUrl: jasmine.Spy };

  beforeEach(async () => {
    authMock = { logout: jasmine.createSpy('logout') };
    restMock = { getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({ username: 'Jan' })) };
    routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    await TestBed.configureTestingModule({
      imports: [AppHeader],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: RestService, useValue: restMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeader);
    component = fixture.componentInstance;
  });

  it('should properly set userName', () => {
    fixture.detectChanges();

    expect(restMock.getCurrentUser).toHaveBeenCalled();
    expect(component.userName()).toBe('Jan');
  });

  it('should logout and redirect to /login page', () => {
    const logout$ = new Subject<void>();

    authMock.logout.and.returnValue(logout$.asObservable());
    component.logout();

    expect(authMock.logout).toHaveBeenCalled();

    logout$.next();
    logout$.complete();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});


