import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicFormModule } from './dynamic-form/dynamic-form.module';


@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule
  ],
  declarations: [],
  exports: [DynamicFormModule]
})
export class FormModule { }
