import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxFieldComponent } from './checkbox-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	declarations: [CheckboxFieldComponent],
	exports: [CheckboxFieldComponent]
})
export class CheckboxFieldModule {}
