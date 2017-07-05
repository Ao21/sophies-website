import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListItemComponent } from './entry-list-item.component';
import { FieldsModule } from './../../form/fields/fields.module';
import { ElementsModule } from './../../elements/elements.module';

@NgModule({
	imports: [CommonModule, FieldsModule, ElementsModule],
	declarations: [EntryListItemComponent],
	exports: [EntryListItemComponent]
})
export class EntryListItemModule {}
