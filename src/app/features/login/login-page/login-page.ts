import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-login-page',
	imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
	templateUrl: './login-page.html',
	styleUrls: ['./login-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
	private readonly formBuilder = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);

	loading = signal(false);
	form = this.formBuilder.group({
		// handle email validation
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	submit() {
		if (this.form.invalid || this.loading()) {
			return;
		}

		this.loading.set(true);

		// chack device
		// const device = detectBrowserName();
		const device = 'chrome';

		this.authService.login({ email: this.form.value.email!, password: this.form.value.password!, device })
			.subscribe({
				next: () => {
					this.router.navigateByUrl('/news')
				},
				complete: () => {
					this.loading.set(false)
				},
				error: (error) => {
					// error message
					console.error(error);
					this.loading.set(false);
				}
			});
	}
}

 


