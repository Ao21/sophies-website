import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListItemComponent } from './entry-list-item.component';
import { FieldsModule } from './../../form/fields/fields.module';

@NgModule({
	imports: [CommonModule, FieldsModule],
	declarations: [EntryListItemComponent],
	exports: [EntryListItemComponent]
})
export class EntryListItemModule {}
