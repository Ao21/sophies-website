import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsEntriesComponent } from './cms-entries.component';

import { ObjectsModule } from './../../objects/objects.module';

@NgModule({
	imports: [CommonModule, ObjectsModule],
	declarations: [CmsEntriesComponent]
})
export class CmsEntriesModule {}
