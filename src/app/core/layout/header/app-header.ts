import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-header',
	imports: [CommonModule, MatToolbarModule, MatButtonModule],
	templateUrl: './app-header.html',
	styleUrls: ['./app-header.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader implements OnInit {
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);

	readonly userName = computed(() => (this.auth.user() as any)?.username ?? (this.auth.user() as any)?.name ?? '');
	readonly isAuth = this.auth.isAuthenticated;

	logout(): void {
		this.auth.logout().subscribe({ next: () => this.router.navigateByUrl('/login') });
	}

	ngOnInit(): void {
		this.auth.ensureUserLoaded().subscribe();
	}
}


