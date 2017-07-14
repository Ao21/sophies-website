import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsEntriesComponent } from './cms-entries.component';

import { ObjectsModule } from './../../objects/objects.module';
import { PipesModule } from './../../../core/pipes/pipes.module';


@NgModule({
	imports: [CommonModule, ObjectsModule, RouterModule, PipesModule],
	declarations: [CmsEntriesComponent]
})
export class CmsEntriesModule {}
