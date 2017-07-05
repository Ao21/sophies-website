import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectPipe } from './select.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [SelectPipe],
	exports: [SelectPipe]
})
export class PipesModule {}
