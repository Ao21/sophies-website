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

import * as _ from 'lodash';
import { BaseField } from './../../models/field.model';

import {
	CanDisable,
	mixinDisabled
} from './../../../../core/common-behaviours/';

import {
	FormGroup,
	FormControl,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TextField } from './../../models/input-field.model';

import { TriggerEvent } from './../../../elements/chip/chip.component';

/**
 * Provider Expression that allows df-counter to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const MULTI_FIELD_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => MultiFieldComponent),
	multi: true
};

/** A simple change event emitted by the Input Field component. */
export class MultiFieldChange {
	source: MultiFieldComponent;
	value: string[];
}

// Boilerplate for applying mixins to MultiField.
/** @docs-private */
export class MultiFieldBase {
	constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _MultiFieldMixinBase = mixinDisabled(MultiFieldBase);

@Component({
	selector: 'multi-field',
	providers: [MULTI_FIELD_CONTROL_VALUE_ACCESSOR],
	templateUrl: './multi-field.component.html',
	styleUrls: ['./multi-field.component.scss']
})
export class MultiFieldComponent extends _MultiFieldMixinBase
	implements OnInit, ControlValueAccessor {
	@Input() question: BaseField<string>;

	private _value: any[] = [];

	inputField = new FormControl(null);

	form: FormGroup;

	inputQuestion = new TextField({
		id: 'multi-input',
		key: 'multi-input',
		config: {
			placeholder: 'Entry'
		}
	});

	get value() {
		return this._value;
	}

	set value(v) {
		this._value = v;

		if (v.length > 0) {
			this.onChange(v);
		} else {
			this.onChange(null);
		}
	}

	/**
	 *	Control Value Accessor Default Functions
	 */
	onTouched: () => any = () => {};

	private onChange = (_: any) => {};

	constructor(
		renderer: Renderer2,
		elementRef: ElementRef,
		private _changeDetectorRef: ChangeDetectorRef
	) {
		super(renderer, elementRef);
	}

	addItem($item) {
		const values = this._value;
		if (!_.find(values, value => value === $item) && $item !== '') {
			values.push($item);
			this.value = values;
			this.form.get('multiInput').reset();
			this._changeDetectorRef.detectChanges();
		}
	}

	removeItem($item) {
		let values = this.value;
		values = _.filter(values, value => {
			return !_.isEqual(value, $item);
		});
		this.value = values;
		this._changeDetectorRef.detectChanges();
	}
	ngOnInit() {
		this.form = new FormGroup({
			multiInput: new FormControl()
		});
	}

	handleTriggerEvent($event: TriggerEvent) {
		switch ($event.trigger) {
			case 'DELETE':
				return this.removeItem($event.value);
		}
	}
	/**
	* Sets the model value. Implemented as part of ControlValueAccessor.
	* @param value Value to be set to the model.
	*/
	writeValue(value: any) {
		if (value === null) {
			return (this._value = []);
		}
		this._value = value;
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
}
