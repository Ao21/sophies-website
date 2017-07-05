import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PortfolioComponent } from './portfolio.component';

import { HomePageRoutes } from './../../../pages/home-page/home-page.routes';
import { ArticlePageRoutes } from './../../../pages/article-page/article-page.routes';

import { LayoutModule } from './../../layout/layout.module';

const portfolioRoutes: Routes = [
	{
		path: '',
		component: PortfolioComponent,
		children: [...HomePageRoutes, ...ArticlePageRoutes]
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(portfolioRoutes),
		LayoutModule
	],
	declarations: [PortfolioComponent],
	exports: [RouterModule]
})
export class PortfolioModule {}
