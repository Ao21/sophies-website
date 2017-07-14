import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsBlocksComponent } from './cms-blocks.component';

describe('CmsBlocksComponent', () => {
  let component: CmsBlocksComponent;
  let fixture: ComponentFixture<CmsBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
