import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
	const auth = inject(AuthService);
	const router = inject(Router);

	if (auth.isAuthenticated()) {
		return true;
	}

	return router.parseUrl('/login');
};

export const redirectLoggedInGuard: CanActivateFn = () => {
	const auth = inject(AuthService);
	const router = inject(Router);

	if (auth.isAuthenticated()) {
		return router.parseUrl('/news');
	}

	return true;
};
