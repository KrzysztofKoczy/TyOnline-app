import { inject, signal } from '@angular/core';
import { RestService } from '../../../core/api/rest.service';
import { map } from 'rxjs';
import { News } from '../model/news.types';

export class NewsService {
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly items = signal<News[]>([]);

  private restService = inject(RestService);

  loadNews(): void {
    this.loading.set(true);
    this.error.set(null);
    this.fetchNews();
  }

  private fetchNews(): void {
    this.restService.getNews()
      .pipe(map((news) => news.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))))
      .subscribe({
        next: (news) => {
          this.items.set(news);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(`Błąd przy pobieraniu newsów: ${error.message}`);
          this.loading.set(false);
        },
      });
  }
}


