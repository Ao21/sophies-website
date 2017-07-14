import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldListComponent } from './field-list.component';
import { PipesModule } from './../../../core/pipes/pipes.module';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
	imports: [CommonModule, PipesModule, DragulaModule],
	declarations: [FieldListComponent],
	exports: [FieldListComponent]
})
export class FieldListModule {}
