import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolygonClipModule } from './svg/polygon-clip/polygon-clip.module';
import { UtilsModule } from './utils/utils.module';


@NgModule({
	imports: [
		CommonModule,
		PolygonClipModule,
		UtilsModule
	],
	declarations: [
	],
	exports: [
		PolygonClipModule,
		UtilsModule
		
	]
})
export class CoreModule { }
