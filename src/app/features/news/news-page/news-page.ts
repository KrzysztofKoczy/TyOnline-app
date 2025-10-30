import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NewsService } from '../services/news.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-news-page',
	imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
	providers: [NewsService],
	templateUrl: './news-page.html',
	styleUrls: ['./news-page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPage implements OnInit {
	private newsService = inject(NewsService);

	readonly loading = this.newsService.loading;
	readonly error = this.newsService.error;
	readonly items = this.newsService.items;

	ngOnInit(): void {
		this.newsService.loadNews();
	}
}




