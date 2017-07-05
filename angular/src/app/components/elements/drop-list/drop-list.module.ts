import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropListComponent } from './drop-list.component';

import { OverlayModule, OptionModule} from './../../../core/';


@NgModule({
	imports: [CommonModule, OverlayModule, OptionModule],
	declarations: [DropListComponent],
	exports: [DropListComponent]
})
export class DropListModule {}
