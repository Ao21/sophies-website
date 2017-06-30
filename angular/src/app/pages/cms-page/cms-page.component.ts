import { Component, OnInit } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

@Component({
	selector: 'app-cms-page',
	templateUrl: './cms-page.component.html',
	styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {
	constructor(public authHttp: AuthHttp) {}

	ngOnInit() {
	}
}
