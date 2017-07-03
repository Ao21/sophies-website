import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import * as moment from 'moment';

export function validYearValidate(c: FormControl) {
	if (c.value && c.value.toString().length !== 4) {
		return { invalidYear: true };
	}
}

function validYearFactory() {
	return validYearValidate;
}