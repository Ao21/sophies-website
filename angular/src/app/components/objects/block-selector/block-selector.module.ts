import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockSelectorComponent } from './block-selector.component';
import { PipesModule } from './../../../core/pipes/pipes.module';

@NgModule({
	imports: [CommonModule, PipesModule],
	declarations: [BlockSelectorComponent],
	exports: [BlockSelectorComponent]
})
export class BlockSelectorModule {}
