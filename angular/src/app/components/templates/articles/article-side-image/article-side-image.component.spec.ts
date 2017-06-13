import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSideSingleImageComponent } from './article-side-image.component';

describe('ArticleSideSingleImageComponent', () => {
  let component: ArticleSideSingleImageComponent;
  let fixture: ComponentFixture<ArticleSideSingleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSideSingleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSideSingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
