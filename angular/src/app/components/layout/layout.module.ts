import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CmsSidebarComponent } from './cms-sidebar/cms-sidebar.component';
import { CmsHeaderComponent } from './cms-header/cms-header.component';

@NgModule({
	imports: [CommonModule],
	declarations: [HeaderComponent, CmsSidebarComponent, CmsHeaderComponent],
	exports: [HeaderComponent, CmsSidebarComponent, CmsHeaderComponent]
})
export class LayoutModule {}
