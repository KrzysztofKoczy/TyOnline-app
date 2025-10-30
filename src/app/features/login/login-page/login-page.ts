import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { detectBrowserName } from '../../../utils/browser.utils';

@Component({
	selector: 'app-login-page',
  imports: [
		CommonModule, 
		ReactiveFormsModule, 
		MatButtonModule, 
		MatFormFieldModule, 
		MatInputModule, 
		MatIconModule, 
		],
	templateUrl: './login-page.html',
	styleUrls: ['./login-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
	private readonly formBuilder = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);

  loading = signal(false);
  showPassword = signal(false);
  errorMsg = signal<string | null>(null);
	form = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
		password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]]
	});

	submit() {
		if (this.form.invalid || this.loading()) {
			return;
		}

    this.loading.set(true);

		const device = detectBrowserName();

		this.authService.login({ email: this.form.value.email!, password: this.form.value.password!, device })
			.subscribe({
				next: () => {
					this.router.navigateByUrl('/news')
				},
				complete: () => {
					this.loading.set(false)
				},
				error: (error) => {
					this.errorMsg.set("Błedne hasło lub email");
					this.loading.set(false);
				}
			});
	}
}

 


