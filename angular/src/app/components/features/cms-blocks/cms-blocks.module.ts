import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsBlocksComponent } from './cms-blocks.component';
import { RouterModule } from '@angular/router';

import { ObjectsModule } from './../../objects/objects.module';
import { PipesModule } from './../../../core/pipes/pipes.module';



@NgModule({
	imports: [CommonModule, ObjectsModule, RouterModule, PipesModule],
	declarations: [CmsBlocksComponent],
	exports: [CmsBlocksComponent]
})
export class CmsBlocksModule {}
