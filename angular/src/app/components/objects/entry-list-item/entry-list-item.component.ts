import {
	Component,
	OnInit,
	Input,
	HostListener,
	Optional,
	Renderer2,
	forwardRef,
	Output,
	EventEmitter,
	OnDestroy,
	ElementRef,
	Inject,
	ViewChild,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { EntryListComponent, EntryListFieldConfig, EntryListConfig } from './../entry-list/entry-list.component';

import { UniqueSelectionDispatcher } from './../../../core/index';

import { findPropertyDeep } from './../../../core/utils/facade';
import * as _ from 'lodash';

let _uniqueIdCounter = 0;

import { CheckboxFieldComponent } from './../../form/fields/checkbox-field/checkbox-field.component';

export interface EntryListItem {
	id: string;
	title: string;
	type: string;
	featured: boolean;
	postdate: string;
}

@Component({
	selector: 'entry-list-item',
	templateUrl: './entry-list-item.component.html',
	styleUrls: ['./entry-list-item.component.scss']
})
export class EntryListItemComponent implements OnInit, OnDestroy {

	@Input() fieldConfig: EntryListFieldConfig[];
	@Input() config: any;
	private _checked = false;
	private _value: any = null;
	@Input() public entry: EntryListItem;

	@Output() trigger: EventEmitter<any> = new EventEmitter();

	@Input() id = `md-radio-${_uniqueIdCounter++}`;
	@Input() name: string;

	@ViewChild('checkbox') checkbox: CheckboxFieldComponent;

	entryList: EntryListComponent;
	settings: any;

	/** Unregister function for _radioDispatcher **/
	private _removeUniqueSelectionListener: () => void = () => { };

	/** The value of this radio button. */
	@Input()
	get value(): any {
		return this._value;
	}

	set value(value: any) {
		if (this._value !== value) {
			this._value = value;
		}
	}

	@Input()
	get checked(): boolean {
		return this._checked;
	}

	set checked(newCheckedState: boolean) {
		if (this._checked !== newCheckedState) {
			this._checked = newCheckedState;

			if (this.entryList) {
				this.entryList.updateSelected(this.id, this._checked);
			}

			if (newCheckedState) {
				// Notify all radio buttons with the same name to un-check.
				this._entryDispatcher.notify(this.id, this.name);
			}
			this._changeDetector.markForCheck();
			this._changeDetector.detectChanges();
		}
	}

	constructor(
		@Optional()
		@Inject(forwardRef(() => EntryListComponent))
		entryList: EntryListComponent,
		elementRef: ElementRef,
		renderer: Renderer2,
		private _changeDetector: ChangeDetectorRef,
		private _entryDispatcher: UniqueSelectionDispatcher
	) {
		this.entryList = entryList;




		this._removeUniqueSelectionListener = _entryDispatcher.listen(
			(id: string, name: string) => {
				if (id !== this.id && name === this.name) {
					this.checkbox.toggle(false);
					this.checked = false;
				}
			}
		);
	}

	getFieldValue(entry, field) {
		return findPropertyDeep(entry, field);
	}
	updateChecked(val: any) {
		this.checked = val.checked;
	}
	ngOnDestroy() {
		this._removeUniqueSelectionListener();
	}

	emitSettingsEvent(triggerEvent) {
		const fieldItemEvent = {
			trigger: triggerEvent,
			id: this.entry.id,
			type: this.entry.type
		};
		this.trigger.next(fieldItemEvent);
	}

	ngOnInit() {
		this.settings = _.find(this.fieldConfig, (field) => field.type === 'settings');
	}
}
