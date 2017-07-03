import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	Output,
	Renderer2,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { CanDisable, mixinDisabled } from './../../../core/common-behaviours/';

declare var require: any;

const Quill = require('quill');

/**
 * Provider Expression that allows df-counter to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const QUILL_COMPONENT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => QuillComponent),
	multi: true
};

// Boilerplate for applying mixins to Quill.
/** @docs-private */
export class QuillBase {
	constructor(public _renderer: Renderer2, public _elementRef: ElementRef) {}
}
export const _QuillMixinBase = mixinDisabled(QuillBase);

@Component({
	selector: 'textarea-field',
	providers: [QUILL_COMPONENT_CONTROL_VALUE_ACCESSOR],
	templateUrl: './quill.component.html',
	styleUrls: [
		'./quill.component.scss',
		'./quill.style.snow.scss'
	],
	encapsulation: ViewEncapsulation.None
})
export class QuillComponent extends _QuillMixinBase
	implements AfterViewInit, ControlValueAccessor, OnChanges {
	quillEditor: any;
	editorElem: HTMLElement;
	content: any;
	defaultModules = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'], // toggled buttons

			[{ header: 1 }, { header: 2 }], // custom button values
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
			[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
			[{ direction: 'rtl' }], // text direction

			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ align: [] }],

			['clean'], // remove formatting button
		]
	};

	@Input() options: Object;

	@Output() blur: EventEmitter<any> = new EventEmitter();
	@Output() focus: EventEmitter<any> = new EventEmitter();
	@Output() ready: EventEmitter<any> = new EventEmitter();
	@Output() change: EventEmitter<any> = new EventEmitter();

	/**
	 *	Control Value Accessor Default Functions
	 */
	onTouched: () => any = () => {};

	private onChange = (_: any) => {};

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
		super(renderer, elementRef);
	}

	ngAfterViewInit() {
		this.editorElem = this.elementRef.nativeElement.children[0];

		this.quillEditor = new Quill(
			this.editorElem,
			Object.assign(
				{
					modules: this.defaultModules,
					placeholder: 'Insert text here ...',
					readOnly: false,
					theme: 'snow',
					boundary: document.body
				},
				this.options || {}
			)
		);

		if (this.content) {
			this.quillEditor.pasteHTML(this.content);
		}

		this.ready.emit(this.quillEditor);

		// mark model as touched if editor lost focus
		this.quillEditor.on('selection-change', range => {
			if (!range) {
				this.onTouched();
				this.blur.emit(this.quillEditor);
			} else {
				this.focus.emit(this.quillEditor);
			}
		});

		// update model if text changes
		this.quillEditor.on('text-change', (delta, oldDelta, source) => {
			let html = this.editorElem.children[0].innerHTML;
			const text = this.quillEditor.getText();

			if (html === '<p><br></p>') {
				html = null;
			}

			this.onChange(html);

			this.change.emit({
				editor: this.quillEditor,
				html: html,
				text: text
			});
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['readOnly'] && this.quillEditor) {
			this.quillEditor.enable(!changes['readOnly'].currentValue);
		}
	}

	/**
	* Sets the model value. Implemented as part of ControlValueAccessor.
	* @param value Value to be set to the model.
	*/
	writeValue(value: any) {
		this.content = value;

		if (this.quillEditor) {
			if (value) {
				this.quillEditor.pasteHTML(value);
				return;
			}
			this.quillEditor.setText('');
		}
	}

	/**
	* Registers a callback to be triggered when the value has changed.
	* Implemented as part of ControlValueAccessor.
	* @param fn Function to be called on change.
	*/
	registerOnChange(fn: (value: any) => void) {
		this.onChange = fn;
	}

	/**
	* Registers a callback to be triggered when the control has been touched.
	* Implemented as part of ControlValueAccessor.
	* @param fn Callback to be triggered when the checkbox is touched.
	*/
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	/**
	 * Disables the select. Part of the ControlValueAccessor interface required
	 * to integrate with Angular's core forms API.
	 *
	 * @param isDisabled Sets whether the component is disabled.
	 */
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
