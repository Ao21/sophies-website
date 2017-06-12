import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article-page.component';
import { TemplatesModule } from './../../components/templates/templates.module';

@NgModule({
	imports: [
		CommonModule,
		TemplatesModule
	],
	declarations: [ArticlePageComponent],
	exports: [
		ArticlePageComponent
	]
})
export class ArticlePageModule { }
