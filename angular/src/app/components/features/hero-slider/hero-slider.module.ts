import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { HeroSliderComponent } from './hero-slider.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		HeroSliderComponent]
})
export class HeroSliderModule { }
