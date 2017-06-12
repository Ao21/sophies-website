import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { ArticleSideImageComponent } from './article-side-image/article-side-image.component';


@NgModule({
	imports: [
		CommonModule,
		CoreModule
	],
	declarations: [
		ArticleSideImageComponent
	],
	exports: [
		ArticleSideImageComponent
	]
})
export class ArticleTemplatesModule { }
