import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HeroSliderModule } from './../../components/features/hero-slider/hero-slider.module';
@NgModule({
	imports: [
		CommonModule,
		HeroSliderModule
	],
	declarations: [
		HomePageComponent
	]
})	
export class HomePageModule { }
