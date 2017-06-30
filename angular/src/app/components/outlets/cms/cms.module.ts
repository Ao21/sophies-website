import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CmsComponent } from './cms.component';

import { LayoutModule } from './../../layout/layout.module';

import { CmsPageRoutes } from './../../../pages/cms-page/cms-page.routes';
import { LoginPageRoutes } from './../../../pages/login-page/login-page.routes';

const cmsRoutes: Routes = [
	{
		path: 'cms',
		component: CmsComponent,
		children: [
			...LoginPageRoutes,
			...CmsPageRoutes
		]
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(cmsRoutes), LayoutModule],
	declarations: [CmsComponent],
	exports: [RouterModule]
})
export class CmsModule {}
