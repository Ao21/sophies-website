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

import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	FormControl
} from '@angular/forms';

import {
	CanDisable,
	mixinDisabled
} from './../../../../core/common-behaviours/';

import { coerceBooleanProperty } from './../../../../core/coercion/boolean-property';

let nextId = 0;

/**
 * Provider Expression that allows df-counter to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const CHECKBOX_FIELD_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CheckboxFieldComponent),
	multi: true
};

/** A simple change event emitted by the Checkbox Field component. */
export class CheckboxFieldChange {
	source: CheckboxFieldComponent;
	checked: boolean;
}

export class CheckboxBase {
	constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _CheckboxMixingBase = mixinDisabled(CheckboxBase);

@Component({
	selector: 'checkbox-field',
	providers: [CHECKBOX_FIELD_CONTROL_VALUE_ACCESSOR],
	templateUrl: './checkbox-field.component.html',
	styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent extends _CheckboxMixingBase
	implements OnInit, CanDisable, ControlValueAccessor {
	@Input() id = `md-checkbox-${++nextId}`;
	get inputId(): string {
		return `input-${this.id}`;
	}

	private _required: boolean;

	/** Whether the checkbox is required. */
	@Input()
	get required(): boolean {
		return this._required;
	}
	set required(value) {
		this._required = coerceBooleanProperty(value);
	}

	@Input() tabIndex = 0;

	/** Name value will be applied to the input element if present */
	@Input() name: string | null = null;

	/** Event emitted when the checkbox's `checked` value changes. */
	@Output()
	change: EventEmitter<CheckboxFieldChange> = new EventEmitter<
		CheckboxFieldChange
	>();
	/** Event emitted when the checkbox's `indeterminate` value changes. */
	@Output()
	indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() value: string;

	onTouched: () => any = () => {};
	private _checked = false;
	private _indeterminate = false;
	private _controlValueAccessorChangeFn: (value: any) => void = () => {};

	/**
   * Whether the checkbox is checked.
   */
	@Input()
	get checked() {
		return this._checked;
	}

	set checked(checked: boolean) {
		if (checked !== this.checked) {
			this._checked = checked;
			this._changeDetectorRef.markForCheck();
		}
	}

	@HostBinding('class.is-checked') get isChecked() {
		return this.checked;
	}

	@HostBinding('class.is-inderminate') get isIndeterminate() {
		return this.indeterminate;
	}

	/**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
	@Input()
	get indeterminate() {
		return this._indeterminate;
	}

	set indeterminate(indeterminate: boolean) {
		const changed = indeterminate !== this._indeterminate;
		this._indeterminate = indeterminate;

		if (changed) {
			// if (this._indeterminate) {
			// 	this._transitionCheckState(TransitionCheckState.Indeterminate);
			// } else {
			// 	this._transitionCheckState(
			// 		this.checked
			// 			? TransitionCheckState.Checked
			// 			: TransitionCheckState.Unchecked
			// 	);
			// }
			this.indeterminateChange.emit(this._indeterminate);
		}
	}

	@ViewChild('input') _inputElement: ElementRef;

	constructor(
		renderer: Renderer2,
		elementRef: ElementRef,
		private _changeDetectorRef: ChangeDetectorRef
	) {
		super(renderer, elementRef);
	}

	ngOnInit() {}

	/** Toggles the `checked` state of the checkbox. */
	toggle(val?): void {
		this.checked = isPresent(val) ? val : !this.checked;
	}

	private _emitChangeEvent() {
		const event = new CheckboxFieldChange();
		event.source = this;
		event.checked = this.checked;

		this._controlValueAccessorChangeFn(this.checked);
		this.change.emit(event);
	}

	/**
	* Sets the model value. Implemented as part of ControlValueAccessor.
	* @param value Value to be set to the model.
	*/
	writeValue(value: any) {
		this.checked = value;
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

	_onInputClick(event: Event) {
		// We have to stop propagation for click events on the visual hidden input element.
		// By default, when a user clicks on a label element, a generated click event will be
		// dispatched on the associated input element. Since we are using a label element as our
		// root container, the click event on the `checkbox` will be executed twice.
		// The real click event will bubble up, and the generated click event also tries to bubble up.
		// This will lead to multiple click events.
		// Preventing bubbling for the second event will solve that issue.
		event.stopPropagation();

		if (!this.disabled) {
			// When user manually click on the checkbox, `indeterminate` is set to false.
			if (this._indeterminate) {
				Promise.resolve().then(() => {
					this._indeterminate = false;
					this.indeterminateChange.emit(this._indeterminate);
				});
			}

			this.toggle();

			// Emit our custom change event if the native input emitted one.
			// It is important to only emit it, if the native input triggered one, because
			// we don't want to trigger a change event, when the `checked` variable changes for example.
			this._emitChangeEvent();
		}
	}

	_onInteractionEvent(event: Event) {
		// We always have to stop propagation on the change event.
		// Otherwise the change event, from the input element, will bubble up and
		// emit its event object to the `change` output.
		event.stopPropagation();
	}
}
