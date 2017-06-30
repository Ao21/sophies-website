import { Component, OnInit, Input } from '@angular/core';

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
export class EntryListItemComponent implements OnInit {
	@Input() public entry: [EntryListItem];
	constructor() {}

	ngOnInit() {
		console.log(this.entry);
	}
}
