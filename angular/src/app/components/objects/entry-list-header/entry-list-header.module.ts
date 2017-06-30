import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListHeaderComponent } from './entry-list-header.component';

@NgModule({
	imports: [CommonModule],
	declarations: [EntryListHeaderComponent],
	exports: [EntryListHeaderComponent]
})
export class EntryListHeaderModule {}
