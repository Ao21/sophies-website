import { BaseField } from './field.model';
import { isPresent } from './../../../core/utils/facade';

import * as _ from 'lodash';

export interface Asset {
	path: string;
	originalname: string;
	mimetype: string;
	filename: string;
	id: string;
}

export class AssetField extends BaseField<Asset[]> {
	type = 'asset';
	multiple: boolean;
	assetType: string;
	assetValue: any[];

	constructor(options: {
		multiple?: boolean;
		assetType?: string;
		assetValue?: any[];
		value?: Asset[];
	}) {
		super(options);

		this.multiple = isPresent(options.multiple) ? options.multiple : false;
		this.assetType = isPresent(options.assetType)
			? options.assetType
			: 'img';

		if (isPresent(options.value)) {
			const values = _.filter(options.value, option => option !== null);
			this.value = _.map(values, v => v.id);
		} else {
			this.value = [];
		}

		if (isPresent(options.assetValue) && options.assetValue !== null) {
			this.value = _.map(options.assetValue, (v: any) => v.id);
		}

		this.assetValue = options.assetValue;
	}
}
