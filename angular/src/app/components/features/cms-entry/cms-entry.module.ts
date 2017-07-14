import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmsEntryComponent } from './cms-entry.component';

import { FormModule } from './../../form/form.module';
import { ObjectsModule } from './../../objects/objects.module';

@NgModule({
	imports: [CommonModule, FormModule, RouterModule, ObjectsModule],
	declarations: [CmsEntryComponent]
})
export class CmsEntryModule {}
