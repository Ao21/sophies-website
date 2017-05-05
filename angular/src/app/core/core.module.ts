import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgComponent } from './svg/svg.component';
import { PolygonClipComponent } from './svg/polygon-clip/polygon-clip.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		SvgComponent,
		PolygonClipComponent],
	exports: [
		SvgComponent,
		PolygonClipComponent
	]
})
export class CoreModule { }
