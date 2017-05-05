import { Routes, RouterModule } from '@angular/router';
import { HomePageRoutes } from './pages/home-page/home-page.routes';

const APP_ROUTES: Routes = [
	...HomePageRoutes
];


export const routing: any = RouterModule.forRoot(APP_ROUTES);
