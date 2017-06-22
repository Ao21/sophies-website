import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMultiStickyBreakerComponent } from './article-multi-sticky-breaker.component';

describe('ArticleMultiStickyBreakerComponent', () => {
  let component: ArticleMultiStickyBreakerComponent;
  let fixture: ComponentFixture<ArticleMultiStickyBreakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMultiStickyBreakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMultiStickyBreakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
