import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from './checkbox/checkbox.module';

@NgModule({
	imports: [CommonModule, CheckboxModule],
	declarations: [],
	exports: [CheckboxModule]
})
export class ElementsModule {}
