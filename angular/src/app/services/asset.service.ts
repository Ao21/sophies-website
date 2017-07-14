import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Apollo } from 'apollo-angular';
import { GetAllAssetsQuery } from './../queries/assets.query';

import { Asset } from './../components/form/models/asset-field.model';
import { Block } from './../queries/blocks.query';
import { BaseField } from './../components/form/models/field.model';

import * as _ from 'lodash';

export interface AssetShare {
	id: string;
	ids?: string[];
	assets?: Asset[];
}

@Injectable()
export class AssetService {
	public assets: {};

	public assetSubject: BehaviorSubject<AssetShare> = new BehaviorSubject({
		id: null
	});

	constructor(private apollo: Apollo) {
		this.apollo.watchQuery({ query: GetAllAssetsQuery }).subscribe(next => {
			this.assets = _.keyBy(
				next.data['assets'],
				(asset: any) => asset.id
			);
		});
	}

	mapFieldToAset(fields: BaseField<any>[]) {
		return _.map(fields, field => {
			if (field.type === 'asset') {
				field.value = _.map(field.value, (img: any) => {
					return this.assets[img];
				});
			}
			return field;
		});
	}
}
