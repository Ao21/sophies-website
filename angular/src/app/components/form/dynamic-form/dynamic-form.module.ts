import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';

import { InputFieldModule } from './../fields/input-field/input-field.module';
import { ToggleFieldModule } from './../fields/toggle-field/toggle-field.module';
import { QuillModule } from './../../externals/quill/quill.module';
import { CheckboxFieldModule } from './../fields/checkbox-field/checkbox-field.module';
import { DateFieldModule } from './../fields/date-field/date-field.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputFieldModule,
		ToggleFieldModule,
		QuillModule,
		CheckboxFieldModule,
		DateFieldModule
	],
	declarations: [DynamicFormComponent],
	exports: [DynamicFormComponent]
})
export class DynamicFormModule {}
