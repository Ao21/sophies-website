import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureDirective } from './picture.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		PictureDirective],
	exports: [
		PictureDirective
	]
})
export class UtilsModule { }
