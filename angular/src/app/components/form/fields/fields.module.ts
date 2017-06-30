import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldModule } from './input-field/input-field.module';

@NgModule({
	imports: [CommonModule, InputFieldModule],
  declarations: [],
  exports: [InputFieldModule]
})
export class FieldsModule {}
