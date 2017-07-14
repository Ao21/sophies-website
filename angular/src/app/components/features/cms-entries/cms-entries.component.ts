import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';

import {
	GetAllEntriesQuery,
	RemoveArticleMutation
} from './../../../queries/entries.query';

enum EntryItemEvent {
	DELETE = 0,
	EDIT = 1
}

@Component({
	selector: 'cms-entries',
	templateUrl: './cms-entries.component.html',
	styleUrls: ['./cms-entries.component.scss']
})
export class CmsEntriesComponent implements OnInit {
	entries$: ApolloQueryObservable<any>;

	fieldsConfig = [
		{
			field: '',
			header: '',
			type: 'checkbox'
		},
		{
			field: 'title',
			header: 'Title',
			type: 'fluid'
		},
		{
			header: '',
			type: 'settings',
			options: [
				{
					name: 'Preview',
					trigger: 'PREVIEW'
				},
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
		console.log($event);
		if ($event.trigger === 'PREVIEW') {
			this.router.navigate([
				'/',
				{ outlets: { popup: ['preview', $event.id] } }
			]);
		}
		if ($event.trigger === 'DELETE') {
			this.apollo.mutate({
				mutation: RemoveArticleMutation,
				variables: $event,
				refetchQueries: [
					{
						query: GetAllEntriesQuery
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
			query: GetAllEntriesQuery
		});
	}
}
