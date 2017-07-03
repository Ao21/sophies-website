import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFieldModule } from './toggle-field.module';
import { ToggleFieldComponent } from './toggle-field.component';

fdescribe('ToggleFieldComponent', () => {
	let component: ToggleFieldComponent;
	let fixture: ComponentFixture<ToggleFieldComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				imports: [ToggleFieldModule],
				declarations: []
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ToggleFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
