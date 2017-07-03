import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputFieldComponent } from './input-field.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	declarations: [InputFieldComponent],
	exports: [InputFieldComponent]
})
export class InputFieldModule {}
