import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';

import { GetEntryQuery } from './../../queries/entries.query';

@Injectable()
export class CheckGetEntryResolve implements Resolve<any> {
	constructor(private apollo: Apollo, private router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<any> | Promise<any> | any {
		const entryId = route.params['id'];

		if (entryId === 'new') {
			return Promise.resolve(false);
		}

		return new Promise((res, rej) => {
			this.apollo
				.query({
					query: GetEntryQuery,
					fetchPolicy: 'network-only',
					variables: {
						id: entryId
					}
				})
				.map(x => x.data['article'])
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
