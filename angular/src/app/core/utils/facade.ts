/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as _ from 'lodash';

export interface BrowserNodeGlobal {
	Object: typeof Object;
	Array: typeof Array;
	Map: typeof Map;
	Set: typeof Set;
	Date: DateConstructor;
	RegExp: RegExpConstructor;
	JSON: typeof JSON;
	Math: any; // typeof Math;
	assert(condition: any): void;
	Reflect: any;
	getAngularTestability: Function;
	getAllAngularTestabilities: Function;
	getAllAngularRootElements: Function;
	frameworkStabilizers: Array<Function>;
	setTimeout: Function;
	clearTimeout: Function;
	setInterval: Function;
	clearInterval: Function;
	encodeURI: Function;
}

// TODO(jteplitz602): Load WorkerGlobalScope from lib.webworker.d.ts file #3492
declare var WorkerGlobalScope: any /** TODO #9100 */;
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
declare var global: any /** TODO #9100 */;

let globalScope: BrowserNodeGlobal;
if (typeof window === 'undefined') {
	if (
		typeof WorkerGlobalScope !== 'undefined' &&
		self instanceof WorkerGlobalScope
	) {
		// TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
		globalScope = <any>self;
	} else {
		globalScope = <any>global;
	}
} else {
	globalScope = <any>window;
}

// export function scheduleMicroTask(fn: Function) {
//   Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
// }

// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
const _global: BrowserNodeGlobal = globalScope;

export { _global as global };

export function getTypeNameForDebugging(type: any): string {
	return type['name'] || typeof type;
}

// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
	// TODO: to be fixed properly via #2830, noop for now
};

export function flattenMyTree(tree) {
	function recurse(nodes, path) {
		return _.map(nodes, function(node: any) {
			const newPath = _.union(path, [node.name]);
			return [
				_.assign(
					{ pathname: newPath.join(' > '), level: path.length },
					_.omit(node, 'children')
				),
				recurse(node.children, newPath)
			];
		});
	}
	return _.flattenDeep(recurse(tree, []));
}

export function isPresent(obj: any): boolean {
	return obj != null;
}

export function isBlank(obj: any): boolean {
	return obj == null;
}

const STRING_MAP_PROTO = Object.getPrototypeOf({});
export function isStrictStringMap(obj: any): boolean {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		Object.getPrototypeOf(obj) === STRING_MAP_PROTO
	);
}

export function mergeArrayByProp(array, prop) {
	const dict = {};

	function customizer(objValue, srcValue) {
		if (_.isArray(objValue)) {
			return objValue.concat(srcValue);
		}
	}

	return _.reduce(
		array,
		(acc, obj, index) => {
			if (dict[obj[prop]]) {
				const idx = dict[obj[prop]];
				acc[idx] = _.mergeWith({}, acc[idx], obj, customizer);
			} else {
				acc.push(obj);
				dict[obj[prop]] = index;
			}
			return acc;
		},
		[]
	);
}

export function findPropertyDeep(obj, key) {
	const newObj = _.assign({}, obj);

	if (_.has(newObj, key)) {
		return newObj[key];
	}
	return _.flatten(
		_.map(newObj, v => {
			return typeof v === 'object' ? findPropertyDeep(v, key) : [];
		}),
		true
	);
}

export function stringify(token: any): string {
	if (typeof token === 'string') {
		return token;
	}

	if (token == null) {
		return '' + token;
	}

	if (token.overriddenName) {
		return `${token.overriddenName}`;
	}

	if (token.name) {
		return `${token.name}`;
	}

	const res = token.toString();
	const newLineIndex = res.indexOf('\n');
	return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

export class NumberWrapper {
	static parseIntAutoRadix(text: string): number {
		const result: number = parseInt(text);
		if (isNaN(result)) {
			throw new Error('Invalid integer literal when parsing ' + text);
		}
		return result;
	}

	static isNumeric(value: any): boolean {
		return !isNaN(value - parseFloat(value));
	}
}

// JS has NaN !== NaN
export function looseIdentical(a: any, b: any): boolean {
	return (
		a === b ||
		(typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b))
	);
}

export function isJsObject(o: any): boolean {
	return o !== null && (typeof o === 'function' || typeof o === 'object');
}

export function print(obj: Error | Object) {
	// tslint:disable-next-line:no-console
	console.log(obj);
}

export function warn(obj: Error | Object) {
	console.warn(obj);
}

export function setValueOnPath(global: any, path: string, value: any) {
	const parts = path.split('.');
	let obj: any = global;
	while (parts.length > 1) {
		const name = parts.shift();
		if (obj.hasOwnProperty(name) && obj[name] != null) {
			obj = obj[name];
		} else {
			obj = obj[name] = {};
		}
	}
	if (obj === undefined || obj === null) {
		obj = {};
	}
	obj[parts.shift()] = value;
}

export function mongoObjectId() {
    let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

// When Symbol.iterator doesn't exist, retrieves the key used in es6-shim
declare const Symbol: any;
let _symbolIterator: any = null;
export function getSymbolIterator(): string | symbol {
	if (!_symbolIterator) {
		if ((<any>globalScope).Symbol && Symbol.iterator) {
			_symbolIterator = Symbol.iterator;
		} else {
			// es6-shim specific logic
			const keys = Object.getOwnPropertyNames(Map.prototype);
			for (let i = 0; i < keys.length; ++i) {
				const key = keys[i];
				if (
					key !== 'entries' &&
					key !== 'size' &&
					(Map as any).prototype[key] === Map.prototype['entries']
				) {
					_symbolIterator = key;
				}
			}
		}
	}
	return _symbolIterator;
}

export function isPrimitive(obj: any): boolean {
	return !isJsObject(obj);
}

export function escapeRegExp(s: string): string {
	return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}
