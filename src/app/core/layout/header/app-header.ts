import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../api/rest.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-header',
	imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
	templateUrl: './app-header.html',
	styleUrls: ['./app-header.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader implements OnInit {
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	private readonly rest = inject(RestService);

	userName = signal<string>('');

	ngOnInit(): void {
		this.rest.getCurrentUser().subscribe((user) => {
			this.userName.set(user.username!);
		});
	}

	logout(): void {
		this.auth.logout().subscribe({ next: () => this.router.navigateByUrl('/login') });
	}
}


