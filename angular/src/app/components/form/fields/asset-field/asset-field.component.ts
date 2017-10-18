import {
	Component,
	forwardRef,
	HostBinding,
	OnInit,
	ChangeDetectorRef,
	Input,
	EventEmitter,
	OnDestroy,
	Renderer2,
	ElementRef,
	Output,
	ViewChild
} from '@angular/core';

import { BaseField } from './../../models/field.model';
import {
	isPresent,
	isPrimitive,
	isJsObject
} from './../../../../core/utils/facade';
import { coerceBooleanProperty } from './../../../../core/coercion/boolean-property';

import { Subscription } from 'rxjs/Rx';

import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	FormControl
} from '@angular/forms';

import {
	CanDisable,
	mixinDisabled
} from './../../../../core/common-behaviours/';

import * as _ from 'lodash';
import { AssetService, AssetShare } from './../../../../services/asset.service';
import { Asset, AssetField } from './../../models/asset-field.model';

import { Apollo } from 'apollo-angular';
import { GetAllAssetsQuery } from './../../../../queries/assets.query';

/**
 * Provider Expression that allows AssetField to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const ASSET_FIELD_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => AssetFieldComponent),
	multi: true
};

/** A simple change event emitted by the Checkbox Field component. */
export class AssetFieldChange {
	source: AssetFieldChange;
	src: string[];
}

export class AssetFieldBase {
	constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _AssetFieldMixinBase = mixinDisabled(AssetFieldBase);

@Component({
	selector: 'asset-field',
	providers: [ASSET_FIELD_CONTROL_VALUE_ACCESSOR],
	templateUrl: './asset-field.component.html',
	styleUrls: ['./asset-field.component.scss']
})
export class AssetFieldComponent extends _AssetFieldMixinBase
	implements OnInit, OnDestroy {
	change: EventEmitter<AssetFieldChange> = new EventEmitter();
	private _value: any[] = [];
	private _required: boolean;

	@Input() question: AssetField;

	@Input() max = 1;

	assets: Asset[];

	sub: Subscription;

	/** Whether the checkbox is required. */
	@Input()
	get required(): boolean {
		return this._required;
	}
	set required(value) {
		this._required = coerceBooleanProperty(value);
	}

	@Input()
	set value(v) {
		this._value = v;
		this.getAssets(v);
		this.onChange(v);
	}
	get value() {
		return this._value;
	}

	private onTouched: () => any = () => {};
	private onChange: (value: any) => void = () => {};

	constructor(
		renderer: Renderer2,
		elementRef: ElementRef,
		private apollo: Apollo,
		private assetService: AssetService,
		private _changeDetectorRef: ChangeDetectorRef
	) {
		super(renderer, elementRef);
	}

	ngOnInit() {
		console.log(this.max);
		this.sub = this.assetService.assetSubject.subscribe(next => {
			if (next.id === this.question.id) {
				this.value = [...this.value, ...next.ids];
			}
		});
	}

	getAssets(ids?: string[]) {
		const assets = this.apollo
			.query({ query: GetAllAssetsQuery })
			.map((x: any) => x.data.assets)
			.map(x => {
				return _.filter(x, (asset: Asset) => {
					return _.find(ids, id => id === asset.id);
				});
			})
			.subscribe((next: any) => {
				this.assets = next;
				if (this.assets.length === 0 && this.value.length !== 0){
					this.value = [];
				}
				this._changeDetectorRef.detectChanges();
			});
	}

	removeItem($item) {
		this.value = _.filter(this.value, value => {
			return value !== $item.id;
		});
	}

	/**
	* Sets the model value. Implemented as part of ControlValueAccessor.
	* @param value Value to be set to the model.
	*/
	writeValue(value: any) {
		this.value = value;
	}

	/**
	* Registers a callback to be triggered when the value has changed.
	* Implemented as part of ControlValueAccessor.
	* @param fn Function to be called on change.
	*/
	registerOnChange(fn: (value: any) => void) {
		this.onChange = fn;
	}

	/**
	* Registers a callback to be triggered when the control has been touched.
	* Implemented as part of ControlValueAccessor.
	* @param fn Callback to be triggered when the checkbox is touched.
	*/
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	/**
	 * Disables the select. Part of the ControlValueAccessor interface required
	 * to integrate with Angular's core forms API.
	 *
	 * @param isDisabled Sets whether the component is disabled.
	 */
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
