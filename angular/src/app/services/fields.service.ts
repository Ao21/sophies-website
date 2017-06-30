import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

export const FieldFragments = {
	defaultFields: `fragment defaultFields on Field {
		... on DateField {
			id
			type
		}
		... on TextField {
			id
		}
	}`
};

const fieldsQuery = gql(`
	query {
  		fields {
    		...defaultFields
  		}
	}
	${FieldFragments.defaultFields}
`);

@Injectable()
export class FieldService {
	constructor(private apollo: Apollo) {}

	getFields() {
		this.apollo.query({ query: fieldsQuery }).map(x => x.data).subscribe(
			next => {
				console.log(next);
			},
			err => {
				console.log(err);
			}
		);
	}
}
