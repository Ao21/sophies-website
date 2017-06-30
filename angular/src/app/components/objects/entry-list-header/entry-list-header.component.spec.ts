import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryListHeaderComponent } from './entry-list-header.component';

describe('EntryListHeaderComponent', () => {
  let component: EntryListHeaderComponent;
  let fixture: ComponentFixture<EntryListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
