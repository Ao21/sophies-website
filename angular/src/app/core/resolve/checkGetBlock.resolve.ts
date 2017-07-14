import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';

import { GetBlockQuery } from './../../queries/blocks.query';

@Injectable()
export class CheckGetBlockResolve implements Resolve<any> {
	constructor(private apollo: Apollo, private router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<any> | Promise<any> | any {
		const blockId = route.params['id'];

		if (blockId === 'new') {
			return Promise.resolve(false);
		}

		return new Promise((res, rej) => {
			this.apollo
				.query({
					query: GetBlockQuery,
					variables: {
						id: blockId
					}
				})
				.map(x => x.data['block'])
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
