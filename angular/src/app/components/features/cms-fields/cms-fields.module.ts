import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmsFieldsComponent } from './cms-fields.component';

import { EntryListModule } from './../../objects/entry-list/entry-list.module';
import { PipesModule } from './../../../core/pipes/pipes.module';

@NgModule({
	imports: [CommonModule, RouterModule, PipesModule, EntryListModule],
	declarations: [CmsFieldsComponent],
	exports: [CmsFieldsComponent]
})
export class CmsFieldsModule {}
