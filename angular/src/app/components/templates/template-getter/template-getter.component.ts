import { Component, OnInit, Input } from '@angular/core';
import { Block } from './../../../queries/blocks.query';
import { Entry } from './../../../queries/entries.query';
@Component({
	selector: 'template-getter',
	templateUrl: './template-getter.component.html',
	styleUrls: ['./template-getter.component.scss']
})
export class TemplateGetterComponent implements OnInit {
	@Input() blocks: Block[];
	@Input() entry: Entry;

	constructor() {}

	ngOnInit() {}
}
