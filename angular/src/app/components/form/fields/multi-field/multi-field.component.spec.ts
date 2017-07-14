import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFieldComponent } from './multi-field.component';

describe('MultiFieldComponent', () => {
  let component: MultiFieldComponent;
  let fixture: ComponentFixture<MultiFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
