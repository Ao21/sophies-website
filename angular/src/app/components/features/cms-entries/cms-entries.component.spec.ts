import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsEntriesComponent } from './cms-entries.component';

describe('CmsEntriesComponent', () => {
  let component: CmsEntriesComponent;
  let fixture: ComponentFixture<CmsEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
