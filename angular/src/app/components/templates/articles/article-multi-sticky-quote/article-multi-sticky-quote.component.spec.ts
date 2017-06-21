import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMultiStickyQuoteComponent } from './article-multi-sticky-quote.component';

describe('ArticleMultiStickyQuoteComponent', () => {
  let component: ArticleMultiStickyQuoteComponent;
  let fixture: ComponentFixture<ArticleMultiStickyQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMultiStickyQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMultiStickyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
