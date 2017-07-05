import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ElementsModule } from './../../elements/elements.module';
import { AssetManagerComponent } from './asset-manager.component';
import { UploaderModule } from './../../externals/uploader/uploader.module';
import { EntryListModule } from './../entry-list/entry-list.module';


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		UploaderModule,
		ElementsModule,
		EntryListModule,
	],
	declarations: [AssetManagerComponent]
})
export class AssetManagerModule {}
