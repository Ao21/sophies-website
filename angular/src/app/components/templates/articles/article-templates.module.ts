import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { ArticleSideSingleImageComponent } from './article-side-image/article-side-image.component';
import { ArticleMultiStickyImageComponent } from './article-multi-sticky-image/article-multi-sticky-image.component';
import { ArticleMultiStickyQuoteComponent } from './article-multi-sticky-quote/article-multi-sticky-quote.component';


@NgModule({
	imports: [
		CommonModule,
		CoreModule
	],
	declarations: [
		ArticleSideSingleImageComponent,
		ArticleMultiStickyImageComponent,
		ArticleMultiStickyQuoteComponent
	],
	exports: [
		ArticleSideSingleImageComponent,
		ArticleMultiStickyImageComponent,
		ArticleMultiStickyQuoteComponent
	]
})
export class ArticleTemplatesModule { }
