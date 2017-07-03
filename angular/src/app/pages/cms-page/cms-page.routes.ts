import { Routes } from '@angular/router';
import { CmsPageComponent } from './cms-page.component';
import { CmsEntriesComponent } from './../../components/features/cms-entries/cms-entries.component';
import { CmsEntryComponent } from './../../components/features/cms-entry/cms-entry.component';

import { AssetManagerComponent } from './../../components/objects/asset-manager/asset-manager.component';

export const CmsPageRoutes: Routes = [
	{
		path: 'entries',
		component: CmsPageComponent,
		canActivate: [],
		resolve: {},
		children: [
			{
				path: '',
				component: CmsEntriesComponent
			},
			{
				path: ':id',
				component: CmsEntryComponent
			}
		],
	}

];
