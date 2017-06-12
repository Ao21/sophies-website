import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSideImageComponent } from './article-side-image.component';

describe('ArticleSideImageComponent', () => {
  let component: ArticleSideImageComponent;
  let fixture: ComponentFixture<ArticleSideImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSideImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSideImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
