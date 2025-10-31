import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { LoginPage } from './login-page';
import { AuthService } from '../../../core/services/auth.service';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let authMock: { login: jasmine.Spy };
  let routerMock: { navigateByUrl: jasmine.Spy };

  beforeEach(async () => {
    authMock = { login: jasmine.createSpy('login') };
    routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit button be disabled, on wrong form', () => {
    component.form.reset({ email: '', password: '' });
    fixture.detectChanges();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(submitBtn.disabled).toBeTrue();
  });

  it('should call AuthService.login and navigate to /news', () => {
    const subject = new Subject<{ token: string }>();

    authMock.login.and.returnValue(subject.asObservable());

    component.form.setValue({ email: 'user@example.com', password: 'pass123' });
    fixture.detectChanges();

    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');

    submitBtn.click();

    expect(component.loading()).toBeTrue();
    expect(authMock.login).toHaveBeenCalled();

    const arg = authMock.login.calls.mostRecent().args[0];

    expect(arg.email).toBe('user@example.com');
    expect(arg.password).toBe('pass123');
    expect(typeof arg.device).toBe('string');

    subject.next({ token: 't' });
    subject.complete();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/news');
  });

  it('should show email error', () => {
    component.form.controls.email.setValue('invalid-email');
    component.form.controls.email.markAsTouched();
    fixture.detectChanges();

    const fields: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('mat-form-field');
    const emailError = fields[0].querySelector('mat-error') as HTMLElement | null;

    expect(emailError).not.toBeNull();
    expect(emailError!.textContent!.trim()).toContain('Podaj poprawny adres email');
  });

  it('should show password error', () => {
    component.form.controls.password.setValue('ab');
    component.form.controls.password.markAsTouched();
    fixture.detectChanges();

    const fields: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('mat-form-field');
    const passwordError = fields[1].querySelector('mat-error') as HTMLElement | null;

    expect(passwordError).not.toBeNull();
    expect(passwordError!.textContent!.trim()).toContain('Hasło jest wymagane (min 3 znaki)');
  });
});


