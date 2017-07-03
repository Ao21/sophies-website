import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryListComponent } from './entry-list.component';
import { EntryListItemModule } from './../entry-list-item/entry-list-item.module';
import { EntryListHeaderModule } from './../entry-list-header/entry-list-header.module';

import { UNIQUE_SELECTION_DISPATCHER_PROVIDER} from './../../../core/coordination/unique-selection-dispatcher';

@NgModule({
	imports: [CommonModule, EntryListItemModule, EntryListHeaderModule],
	declarations: [EntryListComponent],
	providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER],
	exports: [EntryListComponent, EntryListItemModule, EntryListHeaderModule]
})
export class EntryListModule {}
