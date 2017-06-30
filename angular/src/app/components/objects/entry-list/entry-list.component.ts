import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'entry-list',
	templateUrl: './entry-list.component.html',
	styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

	entryList = [{
		id: 0,
		title: 'The Future of Augmented Reality in Light temperature areas',
		type: 'Article',
		featured: true,
		postdate: '29/12/1987'
	}, {
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
	}];
	constructor() {}

	ngOnInit() {}
}
