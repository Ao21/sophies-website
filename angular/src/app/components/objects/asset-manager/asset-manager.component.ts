import {
	Component,
	OnInit,
	HostBinding,
	OnDestroy,
	ViewChild,
	AfterViewInit,
	ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import { isPresent } from './../../../core/utils/facade';

import { environment } from './../../../../environments/environment';

import { slideInDownAnimation } from './../../../core/animations/generic-route.animation';

import { GetAllAssetsQuery } from './../../../queries/assets.query';


@Component({
	selector: 'asset-manager',
	templateUrl: './asset-manager.component.html',
	styleUrls: ['./asset-manager.component.scss'],
	animations: [slideInDownAnimation]
})
export class AssetManagerComponent implements OnInit, AfterViewInit {
	@HostBinding('@routeAnimation') routeAnimation = true;
	uploaderIsVisible = false;

	assetListConfig = {
		selectable: true
	};

	assetFieldConfig = [
		{
			field: 'path',
			header: null,
			type: 'img'
		},
		{
			field: 'originalname',
			header: 'name',
			type: 'text'
		}
	];

	assets: any = [];
	apolloSub: ApolloQueryObservable<any>;

	query = GetAllAssetsQuery;

	constructor(
		private apollo: Apollo,
		private changeRef: ChangeDetectorRef,
		private router: Router
	) {}

	ngOnInit() {
		// this.apolloSub = <any>this.apollo
		// 	.watchQuery({ query: GetAllAssetsQuery });
	}

	updateAssets() {

	}

	ngAfterViewInit() {}
	entryListChanges($event) {
		console.log($event);
	}

	onUploadSuccess($event) {
		this.toggleUpload(false);
	}

	toggleUpload = async (toggle?: boolean) => {
		this.uploaderIsVisible = isPresent(toggle)
			? toggle
			: !this.uploaderIsVisible;
		this.updateAssets();
		this.changeRef.detectChanges();
	}

	closePopup() {
		console.log('hi!');
		// Providing a `null` value to the named outlet
		// clears the contents of the named outlet
		this.router.navigate([{ outlets: { popup: null } }]);
	}

}
