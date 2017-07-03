import {
	Component,
	OnInit,
	AfterViewInit,
	ContentChildren,
	ViewChildren,
	Injectable,
	Output,
	EventEmitter,
	Input,
	forwardRef,
	ChangeDetectorRef,
	QueryList
} from '@angular/core';

import { UniqueSelectionDispatcher } from './../../../core/';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { EntryListItemComponent } from './../entry-list-item/entry-list-item.component';

import * as _ from 'lodash';

/**
 * Provider Expression that allows md-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
export const ENTRY_LIST_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => EntryListComponent),
	multi: true
};

const _uniqueIdCounter = 0;

/** Change event object emitted by MdRadio and MdRadioGroup. */
export class EntryListChange {
	/** The MdRadioButton that emits the change event. */
	source: EntryListComponent | null;
	/** The value of the MdRadioButton. */
	selected: any;
}

@Component({
	selector: 'entry-list',
	providers: [ENTRY_LIST_CONTROL_VALUE_ACCESSOR],
	templateUrl: './entry-list.component.html',
	styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent
	implements OnInit, AfterViewInit, ControlValueAccessor {

	@Output() change: EventEmitter<EntryListChange> = new EventEmitter<EntryListChange>();


	@ViewChildren(forwardRef(() => EntryListItemComponent)) _entries: QueryList<EntryListItemComponent>;

	private _selected: {} | null = {};

	entryList = [
		{
			id: 0,
			title: 'The Future of Augmented Reality in Light temperature areas',
			type: 'Article',
			featured: true,
			postdate: '29/12/1987'
		},
		{
			id: 0,
			title: 'The Future of Augmented Reality',
			type: 'Article',
			featured: true,
			postdate: '29/12/1987'
		},
		{
			id: 0,
			title: 'The Future',
			type: 'Article',
			featured: true,
			postdate: '29/12/1987'
		}
	];

	_value: any[];

	_controlValueAccessorChangeFn: (value: any) => void = () => {};

	/**
	 * onTouch function registered via registerOnTouch (ControlValueAccessor).
	 * @docs-private
	 */
	onTouched: () => any = () => {};

	/** Value of the radio button. */
	@Input()
	get value(): any {
		return this._value;
	}
	set value(newValue: any) {
		if (!_.isEqual(this._value, newValue)) {
			// Set this before proceeding to ensure no circular loop occurs with selection.
			this._value = newValue;
		}
	}

	constructor(private _changeDetector: ChangeDetectorRef) {}

	ngOnInit() {}

	ngAfterViewInit() {
		// this._entries.changes.subscribe(next => {
		// 	console.log(next);
		// });
	}

	updateSelected(key, value) {
		if (value) {
			this._selected[key] = value;
		} else {
			delete this._selected[key];
		}
		this.value = this._selected;
		this._emitChangeEvent();
	}

	private _emitChangeEvent = () => {
		const event = new EntryListChange();
		event.source = this;
		event.selected = this.value;

		this._controlValueAccessorChangeFn(this.value);
		this.change.emit(event);
	}

	/**
	 * Sets the model value. Implemented as part of ControlValueAccessor.
	 * @param value
	 */
	writeValue(value: any) {
		this.value = value;
		this._changeDetector.markForCheck();
	}

	/**
	 * Registers a callback to be triggered when the model value changes.
	 * Implemented as part of ControlValueAccessor.
	 * @param fn Callback to be registered.
	 */
	registerOnChange(fn: (value: any) => void) {
		this._controlValueAccessorChangeFn = fn;
	}

	/**
	 * Registers a callback to be triggered when the control is touched.
	 * Implemented as part of ControlValueAccessor.
	 * @param fn Callback to be registered.
	 */
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	/**
	 * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
	 * @param isDisabled Whether the control should be disabled.
	 */
	setDisabledState(isDisabled: boolean) {
		this._changeDetector.markForCheck();
	}
}
