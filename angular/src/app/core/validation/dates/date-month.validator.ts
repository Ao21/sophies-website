import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

export function validMonthValidate(c: FormControl) {
	const month = parseFloat(c.value);
	return (month >= 1 && month <= 12) ? null : { invalidMonth: true };
}

function validMonthFactory() {
	return validMonthValidate;
}