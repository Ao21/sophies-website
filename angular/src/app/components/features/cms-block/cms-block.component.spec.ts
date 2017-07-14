import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsBlockComponent } from './cms-block.component';

describe('CmsBlockComponent', () => {
  let component: CmsBlockComponent;
  let fixture: ComponentFixture<CmsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
