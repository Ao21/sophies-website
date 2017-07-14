import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import { GetAllBlocksQuery } from './../../../queries/blocks.query';

import { mongoObjectId } from './../../../core/utils/facade';

import * as _ from 'lodash';

@Component({
	selector: 'block-selector',
	templateUrl: './block-selector.component.html',
	styleUrls: ['./block-selector.component.scss']
})
export class BlockSelectorComponent implements OnInit {
	blocks$: ApolloQueryObservable<any>;
	@Output() select: EventEmitter<any> = new EventEmitter();

	constructor(private apollo: Apollo) {}

	ngOnInit() {
		this.blocks$ = this.apollo.watchQuery({
			query: GetAllBlocksQuery,
			fetchPolicy: 'network-only'
		});
	}

	handleClick(block) {
		const sym = JSON.parse(JSON.stringify(block));

		console.log(this.booleanizeObject(sym));
		const blockWithNewID = _.assign({}, sym, {
			id: mongoObjectId()
		});
		this.select.next(blockWithNewID);
	}

	randomizeIds() {}

	booleanizeObject(obj) {
		const keys = Object.keys(obj);
		keys.forEach(key => {
			const value = obj[key];

			obj[key] = value;

			if (_.eq(key, 'id')) {
				obj[key] = mongoObjectId();
			}

			if (typeof value === 'object' && value) {
				this.booleanizeObject(obj[key]);
			}
		});
		return obj;
	}
}
