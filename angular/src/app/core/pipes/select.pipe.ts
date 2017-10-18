import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'select'
})
export class SelectPipe implements PipeTransform {
	public transform(obj: any, name: string = '') {
		console.log(obj);
		if (obj && name !== '') {
			// for Apollo decorator
			if (obj[name]) {
				return obj[name];
			}

			// for Angular2Apollo.watchQuery
			if (obj.data && obj.data[name]) {
				console.log(obj.data[name]);
				return obj.data[name];
			}
		}
	}
}
