import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Router, Resolve, ActivatedRoute } from '@angular/router';

import { GetEntryQuery } from './../../../queries/entries.query';
import { Entry } from './../../../queries/entries.query';
import { Block } from './../../../queries/blocks.query';

import * as _ from 'lodash';

@Component({
	selector: 'article-preview',
	templateUrl: './article-preview.component.html',
	styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {

	blocks$: any;
	constructor(route: ActivatedRoute, private apollo: Apollo) {
		const id = route.params.subscribe(next => {
			this.getArticle(next);
		});
	}

	ngOnInit() {}

	getArticle(id: any) {
		this.blocks$ = this.apollo
			.watchQuery({
				query: GetEntryQuery,
				variables: id,
			});
	}
}
