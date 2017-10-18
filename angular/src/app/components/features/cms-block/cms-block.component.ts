import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import { FieldControlService } from './../../../services/field-control.service';

import { mergeArrayByProp } from './../../../core/utils/facade';

import * as _ from 'lodash';

import { DEFAULT_BLOCK_FIELDS } from './../../../fields/cms-blocks.fields';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
	CreateBlockMutation,
	UpdateBlockMutation,
	GetAllBlocksQuery
} from './../../../queries/blocks.query';

@Component({
	selector: 'cms-block',
	templateUrl: './cms-block.component.html',
	styleUrls: ['./cms-block.component.scss']
})
export class CmsBlockComponent implements OnInit, OnDestroy {
	formQuestions: any;

	fields: any[] = [];

	data: any = {};

	constructor(
		private apollo: Apollo,
		private router: Router,
		private dragulaService: DragulaService,
		private changeRef: ChangeDetectorRef,
		private route: ActivatedRoute,
		private fieldControlService: FieldControlService
	) {
		this.route.data.take(1).subscribe(next => {
			this.data = next;
			if (next.block) {
				this.fields = [...next.block.fields];
			}
			this.formQuestions = this.getFormFields(next);
		});

		dragulaService.drop.subscribe(next => {
			// console.log(next);
		});
	}

	ngOnInit() {
		console.log(this);
	}

	removeField(field) {
		this.fields = _.filter(this.fields, b => b.id !== field.id);
	}

	fieldUpdates($event) {
		console.log($event);
	}

	getFormFields(value?) {
		return this.fieldControlService.getFields(DEFAULT_BLOCK_FIELDS, value);
	}

	handleFieldSelect($field: any) {
		const f = _.find(this.fields, field => field.id === $field.id);
		if (f) {
			return;
		}
		this.fields.push($field);
		this.changeRef.detectChanges();
	}

	createBlock(form) {
		let query = CreateBlockMutation;
		let variables = _.assign({}, form, {
			fields: _.map(this.fields, field => field.id)
		});

		if (this.data.block) {
			query = UpdateBlockMutation;
			variables = _.assign({}, variables, {
				id: this.data.block.id
			});
		}
		this.apollo.mutate({
			mutation: query,
			variables: variables,
			refetchQueries: [
				{
					query: GetAllBlocksQuery
				}
			]
		}).subscribe((next) => {
			this.router.navigate(['./..'], { relativeTo: this.route });
		});


	}

	ngOnDestroy() {}
}
