import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from './components/layout/layout.module';
import { CoreModule } from './core/core.module';

import { routing } from './app.routes';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		LayoutModule,
		HttpModule,
		PagesModule,
		CoreModule,
		routing
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
