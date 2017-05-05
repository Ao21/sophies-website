import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonClipComponent } from './polygon-clip.component';

describe('PolygonClipComponent', () => {
  let component: PolygonClipComponent;
  let fixture: ComponentFixture<PolygonClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
