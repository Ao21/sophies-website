import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBoxModule } from './search-box/search-box.module';
import { DropListModule } from './drop-list/drop-list.module';
import { ChipModule } from './chip/chip.module';

@NgModule({
	imports: [CommonModule, SearchBoxModule, DropListModule, ChipModule],
	declarations: [],
	exports: [SearchBoxModule, DropListModule, ChipModule]
})
export class ElementsModule {}
