import {
	Component,
	OnInit,
	Input,
	OnDestroy,
	ChangeDetectorRef,
	OnChanges,
	AfterViewInit,
	Output,
	EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from './../../../services/field-control.service';

import { BaseField } from './../models/';

import { Subscription } from 'rxjs/Rx';

@Component({
	selector: 'dynamic-form',
	templateUrl: './dynamic-form.component.html',
	providers: [FieldControlService],
	styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent
	implements OnInit, AfterViewInit, OnChanges, OnDestroy {
	@Input() form: FormGroup;
	@Input() emitOnInit = false;
	@Input() subForm = false;
	subscriptions: Subscription[] = [];
	@Input() questions: BaseField<any>[];

	@Input() fields: BaseField<any>[];

	@Output() changes: EventEmitter<any> = new EventEmitter();
	@Output() status: EventEmitter<any> = new EventEmitter();

	constructor(
		private changeRef: ChangeDetectorRef,
		private fieldControlService: FieldControlService
	) {}

	ngOnInit() {
		if (this.subForm) {
			console.log(this.form);
			return this.initSubs();
		}

		if (this.questions) {
			this.fields = this.fieldControlService.getFields(this.questions);
			this.form = this.fieldControlService.toFormGroup(this.fields);
			this.destroySubs();
			this.initSubs();
		}

		if (this.fields) {
			this.initFields();
		}
	}

	ngOnChanges(_) {
		if (_.fields && _.fields.currentValue && !this.subForm) {
			this.initFields();
			setTimeout(() => {
				if (this.form && this.emitOnInit) {
					this.changes.next(this.form.value);
				}
			});
		}
	}

	initQuestions() {}

	initFields() {
		this.form = this.fieldControlService.toFormGroup(this.fields);
		this.destroySubs();
		this.initSubs();
	}

	ngAfterViewInit() {}

	initSubs() {
		const fieldValueChangeSub = this.form.valueChanges.subscribe(
			this.changes
		);
		const statusValueChangeSub = this.form.statusChanges.subscribe(
			this.status
		);
		this.subscriptions.push(fieldValueChangeSub, statusValueChangeSub);
	}

	destroySubs() {
		this.subscriptions.forEach(sub => {
			sub.unsubscribe();
		});
	}
	getFormControl(key: string) {
		return this.form.get(key);
	}

	ngOnDestroy() {
		this.destroySubs();
	}
}
