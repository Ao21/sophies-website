import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsEntriesModule } from './cms-entries/cms-entries.module';
import { CmsEntryModule } from './cms-entry/cms-entry.module';

@NgModule({
	imports: [CommonModule, CmsEntriesModule, CmsEntryModule],
	declarations: [],
	exports: [CmsEntriesModule, CmsEntryModule]
})
export class FeaturesModule {}
