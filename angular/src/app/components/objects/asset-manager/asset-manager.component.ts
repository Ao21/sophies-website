import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from './../../../core/animations/generic-route.animation';

@Component({
	selector: 'asset-manager',
	templateUrl: './asset-manager.component.html',
	styleUrls: ['./asset-manager.component.scss'],
	animations: [slideInDownAnimation]
})
export class AssetManagerComponent implements OnInit {
	@HostBinding('@routeAnimation') routeAnimation = true;
	constructor(private router: Router) {}

	ngOnInit() {}

	closePopup() {
		console.log('hi!');
		// Providing a `null` value to the named outlet
		// clears the contents of the named outlet
		this.router.navigate([{ outlets: { popup: null } }]);
	}
}
