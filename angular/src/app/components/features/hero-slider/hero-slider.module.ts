import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { HeroSliderComponent } from './hero-slider.component';

import { PolygonClipModule } from './../../../core/svg/polygon-clip/polygon-clip.module';

@NgModule({
	imports: [
		CommonModule,
		CoreModule,
	],
	declarations: [
		HeroSliderComponent
	],
	exports: [
		HeroSliderComponent
	]
})
export class HeroSliderModule { }
