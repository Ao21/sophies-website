import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';

export const LoginPageRoutes: Routes = [
	{
		path: 'login',
		component: LoginPageComponent,
		canActivate: [],
		resolve: {}
	}
];