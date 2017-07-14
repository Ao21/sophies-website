import {
	Component,
	forwardRef,
	HostBinding,
	OnInit,
	ChangeDetectorRef,
	Input,
	EventEmitter,
	Self,
	Optional,
	Renderer2,
	ElementRef,
	Output
} from '@angular/core';
import { BaseField } from './../../models/field.model';
import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	NgControl,
	FormControl
} from '@angular/forms';

import {
	CanDisable,
	mixinDisabled
} from './../../../../core/common-behaviours/';

const noop = () => {};

/**
 * Provider Expression that allows df-counter to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const INPUT_FIELD_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => InputFieldComponent),
	multi: true
};

/** A simple change event emitted by the Input Field component. */
export class InputFieldChange {
	source: InputFieldComponent;
	value: string;
}

// Boilerplate for applying mixins to MdCheckbox.
/** @docs-private */
export class InputFieldBase {
	constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _InputFieldMixinBase = mixinDisabled(InputFieldBase);

@Component({
	selector: 'input-field',
	providers: [INPUT_FIELD_CONTROL_VALUE_ACCESSOR],
	templateUrl: './input-field.component.html',
	styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent extends _InputFieldMixinBase
	implements ControlValueAccessor, OnInit, CanDisable {
	@Input() question: BaseField<string>;
	@Input() control: FormControl;

	/** ARIA SETTINGS */

	@Input('aria-invalid')
	get ariaInvalid(): boolean {
		return !this.control.valid;
	}

	get tabindex() {
		return this.disabled ? '-1' : '0';
	}

	/** Internal Value */
	private _value: string;

	/**
	 *	Control Value Accessor Default Functions
	 */
	onTouched: () => any = () => {};

	private _controlValueAccessorChangeFn: (value: any) => void = () => {};

	constructor(
		renderer: Renderer2,
		elementRef: ElementRef,
		private _changeDetectorRef: ChangeDetectorRef
	) {
		super(renderer, elementRef);

	}

	ngOnInit() {}

	/**
	* Sets the model value. Implemented as part of ControlValueAccessor.
	* @param value Value to be set to the model.
	*/
	writeValue(value: any) {
		this._value = value;
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
