import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageModule } from './home-page/home-page.module';
import { ArticlePageModule } from './article-page/article-page.module';
import { CmsPageModule } from './cms-page/cms-page.module';
import { LoginPageModule } from './login-page/login-page.module';

@NgModule({
	imports: [
		CommonModule,
		HomePageModule,
		ArticlePageModule,
		CmsPageModule,
		LoginPageModule
	],
	declarations: []
})
export class PagesModule { }
