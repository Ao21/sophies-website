import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsEntriesModule } from './cms-entries/cms-entries.module';
import { CmsEntryModule } from './cms-entry/cms-entry.module';
import { CmsFieldsModule } from './cms-fields/cms-fields.module';
import { CmsFieldModule } from './cms-field/cms-field.module';

@NgModule({
	imports: [
		CommonModule,
		CmsEntriesModule,
		CmsEntryModule,
		CmsFieldsModule,
		CmsFieldModule
	],
	declarations: [],
	exports: [CmsEntriesModule, CmsEntryModule, CmsFieldsModule, CmsFieldModule]
})
export class FeaturesModule {}
