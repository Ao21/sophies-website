import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolygonClipModule } from './svg/polygon-clip/polygon-clip.module';
import { UtilsModule } from './utils/utils.module';
import { SelectPipe } from './pipes/select.pipe';

import { OverlayModule } from './overlay/';
import { PortalModule } from './portal/';
import { OptionModule } from './option/';
import { A11yModule } from './a11y/';
import { ObserveContentModule} from './observe-content/';
import { MdSelectionModule } from './selection/';


@NgModule({
	imports: [
		CommonModule,
		PolygonClipModule,
		PortalModule,
		OverlayModule,
		UtilsModule,
		ObserveContentModule,
		A11yModule,
		OptionModule,
		MdSelectionModule
	],
	declarations: [],
	exports: [
		PolygonClipModule,
		OverlayModule,
		PortalModule,
		ObserveContentModule,
		UtilsModule,
		A11yModule,
		OptionModule,
		MdSelectionModule

	]
})
export class CoreModule { }
