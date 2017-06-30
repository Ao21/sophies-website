import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomePageRoutes } from './pages/home-page/home-page.routes';
import { ArticlePageRoutes } from './pages/article-page/article-page.routes';

const APP_ROUTES: Routes = [

];

// export const routing: any = RouterModule.forRoot(APP_ROUTES);

@NgModule({
	imports: [RouterModule.forRoot(APP_ROUTES)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
