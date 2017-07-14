import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGetterComponent } from './template-getter.component';

describe('TemplateGetterComponent', () => {
  let component: TemplateGetterComponent;
  let fixture: ComponentFixture<TemplateGetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateGetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
