import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsFieldsComponent } from './cms-fields.component';

describe('CmsFieldsComponent', () => {
  let component: CmsFieldsComponent;
  let fixture: ComponentFixture<CmsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
