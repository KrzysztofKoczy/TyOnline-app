import { inject, Injectable, signal } from '@angular/core';
import { News, RestService } from '../../../core/api/rest.service';
import { map } from 'rxjs';
import { dateToTimestamp } from '../../../core/helpers/date.util';

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
    // think about change to httpResource
    this.restService.getNews()
      .pipe(map((news) => news.sort((a, b) => dateToTimestamp(b.date) - dateToTimestamp(a.date))))
      .subscribe({
        next: (news) => {
          this.items.set(news);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('Nie udało się pobrać newsów. Spróbuj ponownie.');
          this.loading.set(false);
        },
      });
  }
}


