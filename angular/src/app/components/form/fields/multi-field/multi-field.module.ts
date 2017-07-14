import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiFieldComponent } from './multi-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from './../input-field/input-field.module';
import {  ElementsModule } from './../../../elements/elements.module';

@NgModule({
	imports: [CommonModule, InputFieldModule, ReactiveFormsModule, ElementsModule],
	declarations: [MultiFieldComponent],
	exports: [MultiFieldComponent]
})
export class MultiFieldModule {}
