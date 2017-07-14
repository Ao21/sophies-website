import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSelectorComponent } from './block-selector.component';

describe('BlockSelectorComponent', () => {
  let component: BlockSelectorComponent;
  let fixture: ComponentFixture<BlockSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
