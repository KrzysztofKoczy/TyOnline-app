import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../api/rest.service';

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
	private readonly rest = inject(RestService);

	userName = signal<string>('');

	logout(): void {
		this.auth.logout().subscribe({ next: () => this.router.navigateByUrl('/login') });
	}

	ngOnInit(): void {
		this.rest.getCurrentUser().subscribe((user) => {
			this.userName.set(user.username!);
			console.log(user);
		});
	}
}


