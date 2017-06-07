import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgComponent } from './svg/svg.component';
import { PolygonClipModule } from './svg/polygon-clip/polygon-clip.module';



@NgModule({
	imports: [
		CommonModule,
		PolygonClipModule
	],
	declarations: [
		SvgComponent,
	],
	exports: [
		SvgComponent,
		PolygonClipModule
		
	]
})
export class CoreModule { }
