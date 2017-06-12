import { Routes, RouterModule } from '@angular/router';
import { HomePageRoutes } from './pages/home-page/home-page.routes';
import { ArticlePageRoutes } from './pages/article-page/article-page.routes';

const APP_ROUTES: Routes = [
	...HomePageRoutes,
	...ArticlePageRoutes
];


export const routing: any = RouterModule.forRoot(APP_ROUTES);
