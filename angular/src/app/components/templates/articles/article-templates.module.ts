import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleSideImageComponent } from './article-side-image/article-side-image.component';
import { UtilsModule } from './../../../core/utils/utils.module';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule
	],
	declarations: [
		ArticleSideImageComponent
	],
	exports: [
		ArticleSideImageComponent
	]
})
export class ArticleTemplatesModule { }
