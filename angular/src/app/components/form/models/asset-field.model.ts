import { BaseField } from './field.model';
import { isPresent } from './../../../core/utils/facade';

export interface Asset {
	path: string;
	originalname: string;
	mimetype: string;
	filename: string;
}

export class AssetField extends BaseField<Asset[]> {
	type = 'asset';
	multiple: boolean;
	assetType: string;

	constructor(options: {
		multiple?: boolean,
		assetType?: string
		value?: Asset[]
	}) {
		super(options);
		this.multiple = isPresent(options.multiple) ? options.multiple : false;
		this.assetType = isPresent(options.assetType) ? options.assetType : 'img';
		this.value = isPresent(options.value) ? options.value : [];
	}
}