import {
	Component,
	forwardRef,
	HostBinding,
	OnInit,
	ChangeDetectorRef,
	Input,
	EventEmitter,
	Renderer2,
	ElementRef,
	Output,
	ViewChild
} from '@angular/core';

import { BaseField } from './../../models/field.model';
import { isPresent } from './../../../../core/utils/facade';
import { coerceBooleanProperty } from './../../../../core/coercion/boolean-property';

import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	FormControl
} from '@angular/forms';

import {
	CanDisable,
	mixinDisabled
} from './../../../../core/common-behaviours/';

import { Asset, AssetField } from './../../models/asset-field.model';

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
	implements OnInit {
	change: EventEmitter<AssetFieldChange> = new EventEmitter();
	private _value: Asset[] = [];
	private _required: boolean;

	@Input() question: AssetField;

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
	}
	get value() {
		return this._value;
	}

	private onTouched: () => any = () => {};
	private _controlValueAccessorChangeFn: (value: any) => void = () => {};

	constructor(
		renderer: Renderer2,
		elementRef: ElementRef,
		private _changeDetectorRef: ChangeDetectorRef
	) {
		super(renderer, elementRef);
	}

	ngOnInit() {
		console.log(this.question);
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
		this._controlValueAccessorChangeFn = fn;
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
}
