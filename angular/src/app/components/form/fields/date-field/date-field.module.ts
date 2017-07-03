import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFieldComponent } from './date-field.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	declarations: [DateFieldComponent],
	exports: [DateFieldComponent]
})
export class DateFieldModule {}
