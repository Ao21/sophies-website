import { NgModule } from '@angular/core';

import {
	ApolloClient,
	createNetworkInterface,
	IntrospectionFragmentMatcher
} from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

const myFragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData: {
		__schema: {
			types: [
				{
					kind: 'UNION',
					name: 'Field',
					possibleTypes: [
						{
							name: 'TextField'
						},
						{
							name: 'DateField'
						},
						{
							name: 'FieldGroup'
						},
						{
							name: 'AssetField'
						},
						{
							name: 'TextAreaField'
						},
						{
							name: 'ToggleField'
						},
						{
							name: 'CheckboxField'
						}
					]
				},
				{
					kind: 'INTERFACE',
					name: 'FieldInterface',
					possibleTypes: [
						{
							name: 'TextField'
						},
						{
							name: 'DateField'
						},
						{
							name: 'FieldGroup'
						},
						{
							name: 'AssetField'
						},
						{
							name: 'TextAreaField'
						},
						{
							name: 'ToggleField'
						},
						{
							name: 'CheckboxField'
						}
					]
				},
				{
					kind: 'INTERFACE',
					name: 'BlockInterface',
					possibleTypes: [
						{
							name: 'Block'
						}
					]
				},
				{
					kind: 'INTERFACE',
					name: 'ArticleInterface',
					possibleTypes: [
						{
							name: 'Article'
						}
					]
				}
			]
		}
	}
});

export const client = new ApolloClient({
	fragmentMatcher: myFragmentMatcher,
	networkInterface: createNetworkInterface({
		uri: '/api/graphql'
	})
});

export function provideClient(): ApolloClient {
	return client;
}

@NgModule({
	imports: [ApolloModule.forRoot(provideClient)],
	exports: [ApolloModule]
})
export class Apollo {}
