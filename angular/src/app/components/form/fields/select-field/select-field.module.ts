import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from './select-field.component';

import { OverlayModule, OptionModule } from './../../../../core/';


@NgModule({
	imports: [CommonModule, OverlayModule, OptionModule],
	declarations: [SelectFieldComponent],
	exports: [SelectFieldComponent]
})
export class SelectFieldModule {}
