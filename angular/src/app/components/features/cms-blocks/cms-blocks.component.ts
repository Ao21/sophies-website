import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import {
	GetAllBlocksQuery,
	GetBlockQuery,
	RemoveBlockMutation
} from './../../../queries/blocks.query';

enum FieldItemEvents {
	DELETE = 0,
	EDIT = 1
}

@Component({
	selector: 'cms-blocks',
	templateUrl: './cms-blocks.component.html',
	styleUrls: ['./cms-blocks.component.scss']
})
export class CmsBlocksComponent implements OnInit, OnDestroy {
	entries$: ApolloQueryObservable<any>;

	fieldsConfig = [
		{
			field: '',
			header: '',
			type: 'checkbox'
		},
		{
			field: 'name',
			header: 'Name',
			type: 'fluid'
		},
		{
			header: '',
			type: 'settings',
			options: [
				{
					name: 'Edit',
					trigger: 'EDIT'
				},
				{
					name: 'Delete',
					trigger: 'DELETE'
				}
			]
		}
	];

	constructor(
		private apollo: Apollo,
		private router: Router,
		private route: ActivatedRoute
	) {}

	triggerFieldEvent($event) {
		if ($event.trigger === 'DELETE') {
			this.apollo.mutate({
				mutation: RemoveBlockMutation,
				variables: $event,
				refetchQueries: [
					{
						query: GetAllBlocksQuery
					}
				]
			});
		}
		if ($event.trigger === 'EDIT') {
			this.router.navigate([$event.id], { relativeTo: this.route });
		}
	}

	ngOnInit() {
		this.entries$ = this.apollo.watchQuery({
			query: GetAllBlocksQuery
		});
	}

	ngOnDestroy(){
		
	}
}
