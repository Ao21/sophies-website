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
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { isPresent } from './../../../core/utils/facade';
import { environment } from './../../../../environments/environment';

import { slideInDownAnimation } from './../../../core/animations/generic-route.animation';

import {
	GetAllAssetsQuery,
	CreateAssetMutation,
	RemoveAssetMutation
} from './../../../queries/assets.query';

import { AssetService, AssetShare } from './../../../services/asset.service';

import * as _ from 'lodash';

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

	fieldId: string;

	assetFieldConfig = [
		{
			field: '',
			header: '',
			type: 'checkbox'
		},
		{
			field: 'path',
			header: 'name',
			type: 'img'
		},
		{
			field: 'originalname',
			header: '',
			type: 'fluid'
		},
		{
			header: '',
			type: 'settings',
			options: [
				{
					name: 'Delete',
					trigger: 'DELETE'
				}
			]
		}
	];

	assets: any = [];
	entries$: any;

	query = GetAllAssetsQuery;

	selectedEntries: any;

	constructor(
		private apollo: Apollo,
		private assetService: AssetService,
		private changeRef: ChangeDetectorRef,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.params.subscribe(next => {
			this.fieldId = next.id;
		});
		this.updateEntries();
	}

	ngAfterViewInit() {}
	entryListChanges($event) {
		this.selectedEntries = $event.selected;
	}

	triggerFieldEvent($event) {
		if ($event.trigger === 'DELETE') {
			this.apollo
				.mutate({
					mutation: RemoveAssetMutation,
					variables: $event
				})
				.subscribe(() => {
					this.updateEntries();
				});
		}
	}

	onUploadSuccess($event) {
		this.apollo
			.mutate({
				variables: $event[1],
				mutation: CreateAssetMutation,
				refetchQueries: [
					{
						query: GetAllAssetsQuery
					}
				]
			})
			.subscribe(() => {
				this.toggleUpload(false);
			});
	}

	updateEntries() {
		this.apollo
			.query({
				query: GetAllAssetsQuery,
				fetchPolicy: 'network-only'
			})
			.take(1)
			.subscribe((next: any) => {
				this.entries$ = next.data.assets;
				this.changeRef.detectChanges();
			});
	}

	toggleUpload = async (toggle?: boolean) => {
		this.uploaderIsVisible = isPresent(toggle)
			? toggle
			: !this.uploaderIsVisible;
		this.updateEntries();
	}

	selectAssets() {
		const assets = _.map(this.selectedEntries, (entry: any) => {
			return {
				id: entry.id,
				path: entry.path,
				originalname: entry.originalname,
				mimetype: entry.mimetype,
				filename: entry.filename
			};
		});
		this.assetService.assetSubject.next({
			id: this.fieldId,
			ids: _.keys(this.selectedEntries),
			assets: assets
		});
		this.router.navigate([{ outlets: { popup: null } }]);
	}

	closePopup() {
		console.log('hi!');
		// Providing a `null` value to the named outlet
		// clears the contents of the named outlet
		this.router.navigate([{ outlets: { popup: null } }]);
	}
}
