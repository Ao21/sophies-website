import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBoxModule } from './search-box/search-box.module';

@NgModule({
	imports: [CommonModule, SearchBoxModule],
	declarations: [],
	exports: [SearchBoxModule]
})
export class ElementsModule {}
