import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListComponent } from './entry-list.component';
import { EntryListItemModule } from './../entry-list-item/entry-list-item.module';
import { EntryListHeaderModule } from './../entry-list-header/entry-list-header.module';

@NgModule({
	imports: [CommonModule, EntryListItemModule, EntryListHeaderModule],
	declarations: [EntryListComponent],
	exports: [EntryListComponent]
})
export class EntryListModule {}
