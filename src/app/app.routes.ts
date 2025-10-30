import { Routes } from '@angular/router';
import { authGuard, redirectLoggedInGuard } from './core/guards/auth.guard';
import { MainLayout } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'news' },
	{
		path: 'login',
		canActivate: [redirectLoggedInGuard],
		loadChildren: () => import('./features/login/routes').then(r => r.loginRoutes),
	},
	{
		path: '',
		component: MainLayout, 
		canActivate: [authGuard],
		children: [
		  {
			path: 'news',
			loadChildren: () => import('./features/news/routes').then(r => r.newsRoutes),
		  },
		  {
			path: '',
			redirectTo: 'news',
			pathMatch: 'full'
		  }
		]
	  },
	{ path: '**', redirectTo: 'login' },
];
