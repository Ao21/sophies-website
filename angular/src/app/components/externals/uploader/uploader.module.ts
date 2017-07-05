import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';

import { Dropzone } from './../../../core/uploading/dropzone';

@NgModule({
	imports: [CommonModule, Dropzone],
  declarations: [UploaderComponent],
  exports: [UploaderComponent]
})
export class UploaderModule {}
