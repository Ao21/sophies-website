import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsFieldComponent } from './cms-field.component';

import { FormModule } from './../../form/form.module';


@NgModule({
	imports: [CommonModule, FormModule],
	declarations: [CmsFieldComponent],
	exports: [CmsFieldComponent]
})
export class CmsFieldModule {}
