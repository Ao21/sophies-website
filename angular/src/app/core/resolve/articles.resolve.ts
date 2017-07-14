import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import * as _ from 'lodash';
import { GetAllEntriesQuery } from './../../queries/entries.query';

@Injectable()
export class ArticlesResolve implements Resolve<any> {
	constructor(private apollo: Apollo, private router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<any> | Promise<any> | any {
		const slug = route.params['slug'];

		return new Promise((res, rej) => {
			this.apollo
				.query({
					query: GetAllEntriesQuery
				})
				.map(x => x.data['articles'])
				.map(x => {
					return _.find(x, (x: any) => x.slug === slug);
				})
				.subscribe(
					next => {
						res(next);
					},
					err => {
						res(false);
					}
				);
		});
	}
}
