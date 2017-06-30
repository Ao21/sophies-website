import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListItemComponent } from './entry-list-item.component';

@NgModule({
	imports: [CommonModule],
	declarations: [EntryListItemComponent],
	exports: [EntryListItemComponent]
})
export class EntryListItemModule {}
