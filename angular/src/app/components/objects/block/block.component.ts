import {
	Component,
	OnInit,
	Input,
	ViewChild,
	AfterViewInit,
	Output,
	EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from './../../../services/field-control.service';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { GetAllAssetsQuery } from './../../../queries/assets.query';

import { DynamicFormComponent } from './../../form/dynamic-form/dynamic-form.component';

import { isJsObject } from './../../../core/utils/facade';

import * as _ from 'lodash';

@Component({
	selector: 'block',
	templateUrl: './block.component.html',
	styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
	@Input() block: any;
	@Output() changes: EventEmitter<any> = new EventEmitter();

	@Output() orderUpdate: EventEmitter<any> = new EventEmitter();
	@Output() delete: EventEmitter<any> = new EventEmitter();

	@ViewChild('form') form: DynamicFormComponent;

	assets: any = {};

	isValid = false;
	blockFields: any;
	constructor(
		public fieldControlService: FieldControlService
	) {}

	ngOnInit() {
		this.blockFields = this.fieldControlService.getFields(
			this.block.fields
		);
	}

	moveFieldTrigger($event) {
		this.orderUpdate.next($event);
	}
	deleteTrigger() {
		this.delete.next(this.block);
	}

}
