import { Routes } from '@angular/router';
import { CmsPageComponent } from './cms-page.component';
import { CmsEntriesComponent } from './../../components/features/cms-entries/cms-entries.component';
import { CmsEntryComponent } from './../../components/features/cms-entry/cms-entry.component';

import { CmsFieldsComponent } from './../../components/features/cms-fields/cms-fields.component';
import { CmsFieldComponent } from './../../components/features/cms-field/cms-field.component';

import { CmsBlockComponent } from './../../components/features/cms-block/cms-block.component';
import { CmsBlocksComponent } from './../../components/features/cms-blocks/cms-blocks.component';

import { AssetManagerComponent } from './../../components/objects/asset-manager/asset-manager.component';

import { CheckGetFieldResolve } from './../../core/resolve/checkGetField.resolve';
import { CheckGetBlockResolve } from './../../core/resolve/checkGetBlock.resolve';
import { CheckGetEntryResolve} from './../../core/resolve/checkGetEntry.resolve';

export const CmsPageRoutes: Routes = [
	{
		path: 'blocks',
		component: CmsPageComponent,
		canActivate: [],
		resolve: {},
		children: [
			{
				path: '',
				component: CmsBlocksComponent
			},
			{
				path: ':id',
				resolve: { block: CheckGetBlockResolve },
				component: CmsBlockComponent
			}
		]
	},
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
				component: CmsEntryComponent,
				resolve: { entry: CheckGetEntryResolve },
			}
		]
	},
	{
		path: 'fields',
		component: CmsPageComponent,
		canActivate: [],
		resolve: {},
		children: [
			{
				path: '',
				component: CmsFieldsComponent
			},
			{
				path: ':id',
				resolve: { field: CheckGetFieldResolve },
				component: CmsFieldComponent
			}
		]
	}
];
