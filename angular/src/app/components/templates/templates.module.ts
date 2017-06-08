import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTemplatesModule } from './articles/article-templates.module';

@NgModule({
	imports: [
		CommonModule,
		ArticleTemplatesModule
	],
	declarations: [],
	exports: [
		ArticleTemplatesModule
	]
})
export class TemplatesModule { }
