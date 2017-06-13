import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { ArticleSideSingleImageComponent } from './article-side-image/article-side-image.component';
import { ArticleMultiStickyImageComponent } from './article-multi-sticky-image/article-multi-sticky-image.component';


@NgModule({
	imports: [
		CommonModule,
		CoreModule
	],
	declarations: [
		ArticleSideSingleImageComponent,
		ArticleMultiStickyImageComponent
	],
	exports: [
		ArticleSideSingleImageComponent,
		ArticleMultiStickyImageComponent
	]
})
export class ArticleTemplatesModule { }
