import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolygonClipModule } from './svg/polygon-clip/polygon-clip.module';



@NgModule({
	imports: [
		CommonModule,
		PolygonClipModule
	],
	declarations: [
	],
	exports: [
		PolygonClipModule
		
	]
})
export class CoreModule { }
