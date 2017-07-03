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
	Output
} from '@angular/core';

import { BaseField } from './../../models/field.model';

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

const noop = () => {};

/**
 * Provider Expression that allows df-counter to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const TOGGLE_FIELD_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ToggleFieldComponent),
	multi: true
};

/** A simple change event emitted by the Input Field component. */
export class ToggleFieldChange {
	source: ToggleFieldComponent;
	checked: boolean;
}

// Boilerplate for applying mixins to ToggleField.
/** @docs-private */
export class ToggleFieldBase {
	constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _ToggleFieldMixinBase = mixinDisabled(ToggleFieldBase);

let nextId = 0;

@Component({
	selector: 'toggle-field',
	providers: [TOGGLE_FIELD_CONTROL_VALUE_ACCESSOR],
	templateUrl: './toggle-field.component.html',
	styleUrls: ['./toggle-field.component.scss']
})
export class ToggleFieldComponent extends _ToggleFieldMixinBase
	implements OnInit, ControlValueAccessor {
	@Input() question: BaseField<string>;
	@Input() control: FormControl;

	@Input() name: string | null = null;

	private _uniqueId = `md-slide-toggle-${++nextId}`;
	@Input() id: string = this._uniqueId;
	get inputId(): string {
		return `${this.id || this._uniqueId}-input`;
	}
	/** Used to specify the tabIndex value for the underlying input element. */
	@Input() tabIndex = 0;

	/** An event will be dispatched each time the slide-toggle changes its value. */
	@Output()
	change: EventEmitter<ToggleFieldChange> = new EventEmitter<
		ToggleFieldChange
	>();

	private _checked = false;
	private _required = false;

	/** Whether the slide-toggle is required. */
	@Input()
	get required(): boolean {
		return this._required;
	}
	set required(value) {
		this._required = coerceBooleanProperty(value);
	}

	@Input()
	get checked() {
		return !!this._checked;
	}
	set checked(value) {
		if (this.checked !== !!value) {
			this._checked = value;
			this.onChange(this._checked);
		}
	}

	@HostBinding('class.is-checked')
	get isChecked() {
		return this.checked;
	}

	/** Whether the slide-toggle is checked. */

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

	toggleChecked() {
		this.checked = !this.checked;
	}

	ngOnInit() {
	}

	/** Emits the change event to the `change` output EventEmitter */
	private _emitChangeEvent() {
		const event = new ToggleFieldChange();
		event.source = this;
		event.checked = this.checked;
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
