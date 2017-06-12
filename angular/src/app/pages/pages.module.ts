import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageModule } from './home-page/home-page.module';
import { ArticlePageModule } from './article-page/article-page.module';

@NgModule({
	imports: [
		CommonModule,
		HomePageModule,
		ArticlePageModule
	],
	declarations: []
})
export class PagesModule { }
