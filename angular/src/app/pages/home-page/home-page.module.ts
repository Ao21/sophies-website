import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { CoreModule } from './../../core/core.module';

@NgModule({
	imports: [
		CommonModule,
		CoreModule
	],
	declarations: [HomePageComponent]
})	
export class HomePageModule { }
