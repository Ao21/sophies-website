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

import * as moment from 'moment';

import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor,
	FormGroup,
	FormControl,
	FormBuilder
} from '@angular/forms';

import {
	CanDisable,
	mixinDisabled
} from './../../../../core/common-behaviours/';

import { validDayValidate, validMonthValidate, validYearValidate} from './../../../../core/validation/';

const noop = () => {};

/**
 * Provider Expression that allows df-counter to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const DATE_FIELD_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DateFieldComponent),
	multi: true
};

/** A simple change event emitted by the Input Field component. */
export class DateFieldChange {
	source: DateFieldComponent;
	value: string;
}

// Boilerplate for applying mixins to DateField.
/** @docs-private */
export class DateFieldBase {
	constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _DateFieldMixinBase = mixinDisabled(DateFieldBase);

@Component({
	selector: 'date-field',
	providers: [DATE_FIELD_CONTROL_VALUE_ACCESSOR],
	templateUrl: './date-field.component.html',
	styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent extends _DateFieldMixinBase implements OnInit {
	@Input() question: BaseField<string>;
	@Input() formControl: FormControl;

	dateControl: FormGroup;

	/** Internal Form Controls for Day/Month/Year Input */
	day: FormControl = new FormControl('', [validDayValidate]);
	month: FormControl = new FormControl('', [validMonthValidate]);
	year: FormControl = new FormControl('', [validYearValidate]);

	@Input() name: string | null = null;

	private _value: string;
	@Input()
	set value(v) {
		if (v !== this._value) {
			this._value = v;
			this.onChange(v);
		}
	}
	get value() {
		return this._value;
	}

	/** An event will be dispatched each time the slide-toggle changes its value. */
	@Output()
	change: EventEmitter<DateFieldChange> = new EventEmitter<DateFieldChange>();

	/**
	 *	Control Value Accessor Default Functions
	 */
	onTouched: () => any = () => {};

	private onChange = (_: any) => {};

	constructor(
		renderer: Renderer2,
		elementRef: ElementRef,
		private fb: FormBuilder
	) {
		super(renderer, elementRef);
	}

	ngOnInit() {
		this.dateControl = this.fb.group({
			day: this.day,
			month: this.month,
			year: this.year
		});

		/**
		 *	Watches for changes in each of the date inputs and updates the main
		 *	control as necessary
		 */
		this.dateControl.valueChanges.subscribe(next => {
			const derrivedDate = `${next.day}/${next.month}/${next.year}`;
			if (this.dateControl.valid) {
				this.value = moment(derrivedDate, 'DD/MM/YYYY').format(
					'DD/MM/YYYY'
				);
			} else {
				this.value = '';
				this.dateControl.markAsPristine();
			}
		});
  }

  /**
	 * On Completion of each field, it skips the user to the next field and select the value
	 * already there if applicable
	 */
	_autoTab(e: Event, to) {
		const el: any = e.target;
		setTimeout(() => {
			if (el.value.length === el.maxLength && el.classList.contains('ng-valid')) {
				to.focus();
				to.select();
			}
		}, 1);
	}

	/** Emits the change event to the `change` output EventEmitter */
	private _emitChangeEvent() {
		const event = new DateFieldChange();
		event.source = this;
		event.value = this.value;
		this.change.emit(event);
	}

	/**
	 * Updates the date by breaking it down into each component day/month/year and updating
	 * each form control with the new values or no value
	 */
	updateDate(value) {
		if (value && value.split('/').length > 2) {
			const date = value.split('/');
			this.day.setValue(parseFloat(date[0]));
			this.month.setValue(parseFloat(date[1]));
			this.year.setValue(parseFloat(date[2]));
		} else {
			this.day.setValue('');
			this.month.setValue('');
			this.year.setValue('');
		}
	}

	/**
	* Sets the model value. Implemented as part of ControlValueAccessor.
	* @param value Value to be set to the model.
	*/
	writeValue(value: any) {
		this.updateDate(value);
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
}
