import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsPageComponent } from './cms-page.component';

import { LayoutModule } from './../../components/layout/layout.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, LayoutModule, RouterModule],
	declarations: [CmsPageComponent]
})
export class CmsPageModule {}
