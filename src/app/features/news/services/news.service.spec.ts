import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RestService } from '../../../core/api/rest.service';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let restSpy: jasmine.SpyObj<RestService>;

  beforeEach(() => {
    restSpy = jasmine.createSpyObj('RestService', ['getNews']);

    TestBed.configureTestingModule({
      providers: [NewsService, { provide: RestService, useValue: restSpy }],
    });

    service = TestBed.inject(NewsService);
  });

  it('should fetch news, sort descending by date', () => {
    restSpy.getNews.and.returnValue(
      of([
        { id: 2, title: 'B', content: '...', date: '2023-01-02T10:00:00Z' },
        { id: 1, title: 'A', content: '...', date: '2023-01-03T08:00:00Z' },
      ])
    );

    service.loadNews();

    expect(service.items().map((n) => n.id)).toEqual([1, 2]);
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeNull();
  });

  it('should set error message and disable loading, on error', () => {
    restSpy.getNews.and.returnValue(throwError(() => new Error('network')));

    service.loadNews();

    expect(service.loading()).toBeFalse();
    expect(service.error()).toContain('Błąd przy pobieraniu newsów');
  });
});


