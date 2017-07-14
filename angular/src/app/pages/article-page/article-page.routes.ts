import { Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page.component';

import {ArticlesResolve} from './../../core/resolve/articles.resolve';

export const ArticlePageRoutes: Routes = [
	{
		path: 'article',
		component: ArticlePageComponent,
		canActivate: [],
		resolve: { article: ArticlesResolve },
	},
	{
		path: 'article/:slug',
		component: ArticlePageComponent,
		canActivate: [],
		resolve: { article: ArticlesResolve },
	}
];
