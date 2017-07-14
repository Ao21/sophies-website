import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { FeaturesModule } from './components/features/features.module';
import { LayoutModule } from './components/layout/layout.module';
import { CoreModule } from './core/core.module';

import { OutletsModule } from './components/outlets/outlets.module';

import { AppRoutingModule, APP_ROUTING_PROVIDERS } from './app.routes';

import { AuthModule } from './core/auth/auth.httpfactory';

import { SERVICES_MODULE } from './services/services.module';

import { Apollo } from './core/apollo/apollo.client';
import { Dropzone } from './core/uploading/dropzone';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		LayoutModule,
		HttpModule,
		PagesModule,
		CoreModule,
		FeaturesModule,
		OutletsModule,
		AppRoutingModule,
		AuthModule,
		Apollo,
		Dropzone
	],
	providers: [
		Title,
		...APP_ROUTING_PROVIDERS,
		...SERVICES_MODULE],
	bootstrap: [AppComponent]
})
export class AppModule {}
