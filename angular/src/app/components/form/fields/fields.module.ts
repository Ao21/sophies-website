import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldModule } from './input-field/input-field.module';
import { CheckboxFieldModule } from './checkbox-field/checkbox-field.module';
import { ToggleFieldModule } from './toggle-field/toggle-field.module';
import { DateFieldModule } from './date-field/date-field.module';
import { AssetFieldModule } from './asset-field/asset-field.module';

@NgModule({
	imports: [
		CommonModule,
		InputFieldModule,
		CheckboxFieldModule,
		ToggleFieldModule,
		DateFieldModule,
		AssetFieldModule
	],
	declarations: [],
	exports: [
		InputFieldModule,
		CheckboxFieldModule,
		ToggleFieldModule,
		DateFieldModule,
		AssetFieldModule
	]
})
export class FieldsModule {}
