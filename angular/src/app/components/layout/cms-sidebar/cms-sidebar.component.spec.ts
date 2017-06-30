import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSidebarComponent } from './cms-sidebar.component';

describe('CmsSidebarComponent', () => {
  let component: CmsSidebarComponent;
  let fixture: ComponentFixture<CmsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
