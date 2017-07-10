import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export interface TriggerEvent {
	trigger: string;
	value: any;
}

@Component({
	selector: 'chip',
	templateUrl: './chip.component.html',
	styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
	@Input() value: string;
	@Output()
	trigger: EventEmitter<TriggerEvent> = new EventEmitter();
	constructor() {}

	ngOnInit() {}

	emitEvent($event) {
		const event = {
			trigger: $event,
			value: this.value
		};
		this.trigger.next(event);
	}
}
