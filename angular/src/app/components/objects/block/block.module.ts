import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';

import { FormModule } from './../../form/form.module';

@NgModule({
	imports: [CommonModule, FormModule],
	declarations: [BlockComponent],
	exports: [BlockComponent]
})
export class BlockModule {}
