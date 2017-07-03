import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

export function validDayValidate(c: FormControl) {
	const day = parseFloat(c.value);
	return (day >= 1 && day <= 31) ? null : { invalidDay: true };
}

function validDayFactory() {
	return validDayValidate;
}
