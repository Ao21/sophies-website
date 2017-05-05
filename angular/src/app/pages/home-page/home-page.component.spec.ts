import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageModule } from './home-page.module';
import { HomePageComponent } from './home-page.component';

import { CoreModule } from './../../core/core.module';

describe('HomePageComponent', () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HomePageModule,
				CoreModule
			],
			declarations: [  ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
