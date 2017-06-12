import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingClipComponent } from './scrolling-clip.component';

describe('ScrollingClipComponent', () => {
  let component: ScrollingClipComponent;
  let fixture: ComponentFixture<ScrollingClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollingClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollingClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
