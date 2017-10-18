import { NgModule } from '@angular/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { environment } from './../../../environments/environment';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
	// Change this to your upload POST address:
	url: environment.urls.upload,
	maxFilesize: 50,
	acceptedFiles: 'image/*'
};

@NgModule({
	imports: [
		DropzoneModule.forRoot(DROPZONE_CONFIG)
	],
	declarations: [],
	exports: [
		DropzoneModule
	]
})
export class Dropzone { }
