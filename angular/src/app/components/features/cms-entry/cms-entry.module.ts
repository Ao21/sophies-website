import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsEntryComponent } from './cms-entry.component';

import { RouterModule } from '@angular/router';

import { FormModule } from './../../form/form.module';

@NgModule({
	imports: [CommonModule, FormModule, RouterModule],
	declarations: [CmsEntryComponent]
})
export class CmsEntryModule {}
