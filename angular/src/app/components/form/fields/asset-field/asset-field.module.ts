import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssetFieldComponent } from './asset-field.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [AssetFieldComponent],
	exports: [AssetFieldComponent]
})
export class AssetFieldModule {}
