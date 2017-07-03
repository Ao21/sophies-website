import {
	Component,
	OnInit,
	Input,
	HostListener,
	Optional,
	Renderer2,
	forwardRef,
	OnDestroy,
	ElementRef,
	Inject,
	ViewChild,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { EntryListComponent } from './../entry-list/entry-list.component';
import { UniqueSelectionDispatcher } from './../../../core/index';

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
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './entry-list-item.component.html',
	styleUrls: ['./entry-list-item.component.scss']
})
export class EntryListItemComponent implements OnInit, OnDestroy {
	private _checked = false;
	@Input() public entry: [EntryListItem];

	@Input() id = `md-radio-${_uniqueIdCounter++}`;
	@Input() name: string;

	entryList: EntryListComponent;

	/** Unregister function for _radioDispatcher **/
	private _removeUniqueSelectionListener: () => void = () => { };

	/** Value assigned to this radio.*/
	private _value: any = null;

	@ViewChild('checkbox') checkbox: CheckboxFieldComponent;

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
	updateChecked(val: any) {
		this.checked = val.checked;
	}
	ngOnDestroy() {
		this._removeUniqueSelectionListener();
	}

	ngOnInit() {
		// console.log(this.entry);
	}
}
