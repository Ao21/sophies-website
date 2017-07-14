import {
	Component,
	ChangeDetectorRef,
	OnInit,
	OnDestroy,
	ViewChild,
	ViewChildren,
	QueryList,
	AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { DynamicFormComponent } from './../../form/dynamic-form/dynamic-form.component';

import { Apollo } from 'apollo-angular';
import { FieldControlService } from './../../../services/field-control.service';
import { BlockComponent } from './../../objects/block/block.component';

import { AssetService } from './../../../services/asset.service';

import { Subject, Subscription } from 'rxjs/Rx';

import {
	CreateEntryMutation,
	UpdateEntryMutation,
	GetAllEntriesQuery
} from './../../../queries/entries.query';
import { Block } from './../../../queries/blocks.query';

import {
	DEFAULT_ENTRY_FIELDS,
	DEFAULT_ENTRY_SIDE_FIELDS
} from './../../../fields/cms-entries.fields';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import * as _ from 'lodash';
import { slugify } from './../../../core/utils/facade';

@Component({
	selector: 'cms-entry',
	templateUrl: './cms-entry.component.html',
	styleUrls: ['./cms-entry.component.scss']
})
export class CmsEntryComponent implements OnInit, AfterViewInit, OnDestroy {
	defaultEntryForm: any;
	defaultEntrySideForm: any;
	data: any = {};

	@ViewChild('sideForm') sideForm: DynamicFormComponent;
	@ViewChildren(BlockComponent) blockEntries: QueryList<BlockComponent>;

	blocksWithValues = {};
	mainFormValues: any;
	sideFormValues: any;

	blocks: any[] = [];

	titleUpdate: Subject<any>;

	subs: Subscription[] = [];

	constructor(
		private apollo: Apollo,
		private router: Router,
		private dragulaService: DragulaService,
		private changeRef: ChangeDetectorRef,
		private route: ActivatedRoute,
		private assetService: AssetService,
		private fieldControlService: FieldControlService
	) {
		this.titleUpdate = new Subject();

		const sub = this.titleUpdate.debounceTime(800).subscribe(next => {
			this.sideForm.getFormControl('slug').setValue(slugify(next));
		});

		this.subs.push(sub);

		this.route.data.take(1).subscribe(next => {
			this.data = next;
			this.defaultEntryForm = this.getFormFields(next);
			this.defaultEntrySideForm = this.fieldControlService.getFields(
				DEFAULT_ENTRY_SIDE_FIELDS,
				next
			);
			if (next.entry.blocks) {
				this.blocks = [...next.entry.blocks];
			}
		});
	}

	ngOnInit() {}

	ngAfterViewInit() {
		const sub = this.blockEntries.changes.subscribe(next => {
			console.log(next);
		});
		this.subs.push(sub);
	}

	previewArticle() {
		this.saveEntry(false, id => {
			setTimeout(() => {
				this.router.navigate([
					'/',
					{ outlets: { popup: ['preview', this.data.entry.id] } }
				]);
			});
		});
	}

	formUpdate($event) {
		this.mainFormValues = $event;

		const sideformSlug = this.sideForm.getFormControl('slug');
		if (
			sideformSlug.value === '' ||
			(sideformSlug.value === null && $event.title)
		) {
			this.titleUpdate.next($event.title);
		}
	}
	sideFormUpdate($event) {
		this.sideFormValues = $event;
	}

	getFormFields(value?) {
		return this.fieldControlService.getFields(DEFAULT_ENTRY_FIELDS, value);
	}

	addBlock(block) {
		this.blocks.push(block);
	}

	removeBlock(block) {
		this.blocks = _.filter(this.blocks, b => b.id !== block.id);
	}

	reorderBlock(move, block, index) {
		this.blocks.splice(index + move, 0, this.blocks.splice(index, 1)[0]);
	}

	blockUpdate(blockValue, block, index) {}

	saveEntry(nav = true, cb) {
		const blockValues = <any>this.blockEntries.map(block => {
			const b = _.assign({}, block.block);
			if (block.form.form.valid) {
				const questions = this.fieldControlService.mapQuestionsToValues(
					block.block.fields,
					block.form.form.value
				);
				b.fields = this.assetService.mapFieldToAset(questions);
			}

			return b;
		});

		let query = CreateEntryMutation;

		let variables = _.merge(this.mainFormValues, this.sideFormValues);

		variables = _.assign({}, variables, {
			blocks: JSON.stringify(blockValues)
		});

		if (this.data.entry) {
			query = UpdateEntryMutation;
			variables = _.assign({}, variables, {
				id: this.data.entry.id
			});
		}

		const mutation = this.apollo
			.mutate({
				mutation: query,
				variables: variables,
				refetchQueries: [
					{
						query: GetAllEntriesQuery
					}
				]
			})
			.subscribe(({ data }: { data: any }) => {
				if (nav) {
					this.router.navigate(['./..'], { relativeTo: this.route });
				}
				if (cb) {
					this.data.entry = data.createArticle
						? data.createArticle
						: data.updateArticle;
					cb();
				}
			});

		this.subs.push(mutation);
	}

	ngOnDestroy() {
		this.blocks = [];
		this.subs.forEach(sub => sub.unsubscribe());
	}
}
