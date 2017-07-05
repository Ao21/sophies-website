import { Component, OnInit, Input } from '@angular/core';

import { EntryListFieldConfig } from './../entry-list/entry-list.component';

@Component({
	selector: 'entry-list-header',
	templateUrl: './entry-list-header.component.html',
	styleUrls: ['./entry-list-header.component.scss']
})
export class EntryListHeaderComponent implements OnInit {
	@Input() fieldConfig: EntryListFieldConfig[];
	constructor() {}

  ngOnInit() {
    console.log(this.fieldConfig);
  }
}
