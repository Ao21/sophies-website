import {
	Component,
	OnInit,
	OnDestroy,
	Input,
	ContentChildren,
	ViewChildren,
	QueryList,
	AfterContentInit,
	Output,
	EventEmitter
} from '@angular/core';

import { Subscription, Observable } from 'rxjs/Rx';
import { merge } from 'rxjs/observable/merge';

import { startWith, filter } from './../../../core/rxjs/';

import { Option, OptionSelectionChange } from './../../../core/option/option';

@Component({
	selector: 'drop-list',
	templateUrl: './drop-list.component.html',
	styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent implements OnInit, AfterContentInit {
	panelOpen = false;

	@Input() entries: any;

	@ContentChildren(Option) options: QueryList<Option>;
	private _optionSubscription: Subscription | null;
	private _changeSubscription: Subscription;

	get optionSelectionChanges(): Observable<OptionSelectionChange> {
		return merge(...this.options.map(option => option.onSelectionChange));
	}

	@Output() trigger: EventEmitter<any> = new EventEmitter();

	_positions = [
		{
			originX: 'end',
			originY: 'top',
			overlayX: 'end',
			overlayY: 'top'
		},
		{
			originX: 'start',
			originY: 'top',
			overlayX: 'start',
			overlayY: 'bottom'
		}
	];

	constructor() {}

	ngOnInit() {}

	ngAfterContentInit() {
		this._changeSubscription = startWith
			.call(this.options.changes, null)
			.subscribe(() => {
				this._resetOptions();
			});
	}

	toggle($event: Event) {
		$event.stopPropagation();
		this.panelOpen ? this.close() : this.open();
	}

	open() {
		this.panelOpen = true;
	}

	close() {
		this.panelOpen = false;
	}

	emitEvent($event) {
		this.trigger.next($event.trigger);
		this.close();
	}

	private _resetOptions(): void {
		this._dropSubscriptions();
		this._listenToOptions();
	}

	private _listenToOptions(): void {
		this._optionSubscription = filter
			.call(this.optionSelectionChanges, event => event.isUserInput)
			.subscribe(event => {
				// console.log(event);
			});
	}

	private _dropSubscriptions(): void {
		if (this._optionSubscription) {
			this._optionSubscription.unsubscribe();
			this._optionSubscription = null;
		}
	}
}
