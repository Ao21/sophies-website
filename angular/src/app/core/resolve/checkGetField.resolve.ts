import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';

import { GetField } from './../../queries/fields.query';

@Injectable()
export class CheckGetFieldResolve implements Resolve<any> {
	constructor(private apollo: Apollo, private router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<any> | Promise<any> | any {
		const fieldId = route.params['id'];

		if (fieldId === 'new') {
			return Promise.resolve(true);
		}

		return new Promise((res, rej) => {
			this.apollo
				.query({
					query: GetField,
					variables: {
						id: fieldId
					}
				})
				.map(x => x.data['field'])
				.subscribe(
					next => {
						res(next);
					},
					err => {
						res(true);
					}
				);
		});
	}
}
