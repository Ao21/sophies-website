import { Component, OnInit } from '@angular/core';
import { FieldService } from './../../../services/fields.service';

@Component({
	selector: 'cms-entry',
	templateUrl: './cms-entry.component.html',
	styleUrls: ['./cms-entry.component.scss']
})
export class CmsEntryComponent implements OnInit {
	constructor(private fieldService: FieldService) {}

	ngOnInit() {
		this.fieldService.getFields();
	}
}
