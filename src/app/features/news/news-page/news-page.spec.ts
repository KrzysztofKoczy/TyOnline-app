import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsPage } from './news-page';
import { NewsService } from '../services/news.service';

describe('NewsPage', () => {
  let fixture: ComponentFixture<NewsPage>;
  let component: NewsPage;
  let newsServiceMock: {
    loading: ReturnType<typeof signal<boolean>>;
    error: ReturnType<typeof signal<string | null>>;
    items: ReturnType<typeof signal<any[]>>;
    loadNews: jasmine.Spy;
  };

  beforeEach(async () => {
    newsServiceMock = {
      loading: signal(false),
      error: signal<string | null>(null),
      items: signal<any[]>([]),
      loadNews: jasmine.createSpy('loadNews'),
    };

    await TestBed.configureTestingModule({
      imports: [NewsPage],
    }).overrideProvider(NewsService, { useValue: newsServiceMock }).compileComponents();

    fixture = TestBed.createComponent(NewsPage);
    component = fixture.componentInstance;
  });

  it('should call loadNews on ngOnInit', () => {
    fixture.detectChanges();
    expect(newsServiceMock.loadNews).toHaveBeenCalledTimes(1);
  });
});


