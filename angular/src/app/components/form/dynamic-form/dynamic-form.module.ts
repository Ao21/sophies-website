import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';

import { InputFieldModule } from './../fields/input-field/input-field.module';
import { ToggleFieldModule } from './../fields/toggle-field/toggle-field.module';
import { QuillModule } from './../../externals/quill/quill.module';
import { CheckboxFieldModule } from './../fields/checkbox-field/checkbox-field.module';
import { DateFieldModule } from './../fields/date-field/date-field.module';
import { AssetFieldModule } from './../fields/asset-field/asset-field.module';
import { SelectFieldModule } from './../fields/select-field/select-field.module';
import { MultiFieldModule } from './../fields/multi-field/multi-field.module';

import { OptionModule } from './../../../core/';


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputFieldModule,
		OptionModule,
		ToggleFieldModule,
		QuillModule,
		CheckboxFieldModule,
		DateFieldModule,
		AssetFieldModule,
		SelectFieldModule,
		MultiFieldModule
	],
	declarations: [DynamicFormComponent],
	exports: [DynamicFormComponent]
})
export class DynamicFormModule {}
