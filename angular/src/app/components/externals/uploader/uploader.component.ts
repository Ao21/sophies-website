import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'uploader',
	templateUrl: './uploader.component.html',
	styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
	@Output() success: EventEmitter<any> = new EventEmitter();
	config = {};

	constructor() {}

	onUploadSuccess($event) {
		this.success.next($event);
	}

	onUploadError($event) {}

	ngOnInit() {}
}
