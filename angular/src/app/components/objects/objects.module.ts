import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryListModule } from './entry-list/entry-list.module';
import { EntryListItemModule } from './entry-list-item/entry-list-item.module';
import { EntryListHeaderModule } from './entry-list-header/entry-list-header.module';

@NgModule({
	imports: [
		CommonModule,
		EntryListModule,
		EntryListItemModule,
		EntryListHeaderModule
	],
	declarations: [],
	exports: [EntryListModule, EntryListItemModule, EntryListHeaderModule]
})
export class ObjectsModule {}
