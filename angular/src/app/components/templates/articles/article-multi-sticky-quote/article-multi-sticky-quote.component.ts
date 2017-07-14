import { Component, OnInit, Input } from '@angular/core';
import { FieldControlService } from './../../../../services/field-control.service';
import { Entry } from './../../../../queries/entries.query';
import * as _ from 'lodash';

@Component({
	selector: 'article-multi-sticky-quote',
	templateUrl: './article-multi-sticky-quote.component.grid.html',
	styleUrls: ['./article-multi-sticky-quote.component.grid.scss']
})
export class ArticleMultiStickyQuoteComponent implements OnInit {
	private _fields: any;
	@Input() entry: Entry;
	@Input() isFirst = false;

	@Input()
	set fields(v) {
		v = this.fieldService.getFieldValues(v);
		this._fields = _.keyBy(v, (v: any) => v.key);
	}
	get fields() {
		return this._fields;
	}

	constructor(private fieldService: FieldControlService) {}

	ngOnInit() {
		console.log(this.fields);
		console.log(this.entry);
	}
}
