import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	declarations: [SearchBoxComponent],
	exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
