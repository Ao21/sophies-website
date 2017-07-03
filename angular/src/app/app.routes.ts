import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomePageRoutes } from './pages/home-page/home-page.routes';
import { ArticlePageRoutes } from './pages/article-page/article-page.routes';

import { AssetManagerComponent } from './components/objects/asset-manager/asset-manager.component';

const APP_ROUTES: Routes = [
	{
		path: 'compose',
		component: AssetManagerComponent,
		outlet: 'popup'
	}
];

// export const routing: any = RouterModule.forRoot(APP_ROUTES);

@NgModule({
	imports: [RouterModule.forRoot(APP_ROUTES, { enableTracing: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
