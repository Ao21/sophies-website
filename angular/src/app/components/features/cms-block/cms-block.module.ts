import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsBlockComponent } from './cms-block.component';

import { ObjectsModule } from './../../objects/objects.module';
import { FormModule } from './../../form/form.module';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';


@NgModule({
	imports: [CommonModule, ObjectsModule, FormModule, DragulaModule],
	declarations: [CmsBlockComponent],
	exports: [CmsBlockComponent]
})
export class CmsBlockModule {}
