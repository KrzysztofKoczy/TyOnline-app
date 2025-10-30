import { Routes } from '@angular/router';

export const newsRoutes: Routes = [
	{ path: '', loadComponent: () => import('./news-page/news-page').then(c => c.NewsPage) }
];
