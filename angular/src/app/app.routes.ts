import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomePageRoutes } from './pages/home-page/home-page.routes';
import { ArticlePageRoutes } from './pages/article-page/article-page.routes';

import { AssetManagerComponent } from './components/objects/asset-manager/asset-manager.component';
import { ArticlePreviewComponent } from './components/objects/article-preview/article-preview.component';

import { RESOLVE_MODULES } from './core/resolve/resolve.module';

import { PortfolioComponent } from './components/outlets/portfolio/portfolio.component';

const APP_ROUTES: Routes = [
	{
		path: 'compose/:id',
		component: AssetManagerComponent,
		outlet: 'popup'
	},
	{
		path: 'preview/:id',
		component: ArticlePreviewComponent,
		outlet: 'popup'
	},
	{ path: '**', component: PortfolioComponent }
];

// export const routing: any = RouterModule.forRoot(APP_ROUTES);

@NgModule({
	imports: [RouterModule.forRoot(APP_ROUTES, { enableTracing: false })],
	exports: [RouterModule]
})
export class AppRoutingModule { }

export const APP_ROUTING_PROVIDERS: any[] = [
	// ...GUARD_MODULES,
	...RESOLVE_MODULES
];
