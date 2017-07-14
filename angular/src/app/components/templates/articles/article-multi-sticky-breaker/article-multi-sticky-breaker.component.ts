import { Component, OnInit, Input } from '@angular/core';
import { FieldControlService } from './../../../../services/field-control.service';
import { Entry } from './../../../../queries/entries.query';
import * as _ from 'lodash';

@Component({
	selector: 'article-multi-sticky-breaker',
	templateUrl: './article-multi-sticky-breaker.component.html',
	styleUrls: ['./article-multi-sticky-breaker.component.scss']
})
export class ArticleMultiStickyBreakerComponent implements OnInit {
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
