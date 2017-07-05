import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBoxModule } from './search-box/search-box.module';
import { DropListModule } from './drop-list/drop-list.module';

@NgModule({
	imports: [CommonModule, SearchBoxModule, DropListModule],
	declarations: [],
	exports: [SearchBoxModule, DropListModule]
})
export class ElementsModule {}
