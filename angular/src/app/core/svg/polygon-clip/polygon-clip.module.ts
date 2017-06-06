import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolygonClipComponent } from './polygon-clip.component';
import { ScrollDispatchModule } from './../../positioning/index';

@NgModule({
	imports: [
		CommonModule,
		ScrollDispatchModule
	],
	declarations: [
		PolygonClipComponent
	],
	exports: [
		PolygonClipComponent
	]
})
export class PolygonClipModule { }
