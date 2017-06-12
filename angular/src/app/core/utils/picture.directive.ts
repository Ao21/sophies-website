import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

const PHOTO_SIZES = {
	small: {
		ext: '@0,5x.jpg',
		media: '(max-width: 320px)'
	},
	medium: {
		ext: '@0,75x.jpg',
		media: '(max-width: 768px)'
	},
	large: {
		ext: '.jpg',
		media: '(max-width: 1024px)'
	},
	wide: {
		ext: '@2x.jpg',
		media: '(min-width: 1440px)'
	}
}

@Directive({
	selector: '[picture]'
})
export class PictureDirective implements OnInit {

	@Input() picture: string;
	@Input() sizes: string[];

	constructor(
		private element: ElementRef,
		private renderer: Renderer2
	) { }

	ngOnInit() {
		const picture: HTMLPictureElement = this.renderer.createElement('picture');

		this.sizes.forEach((size) => {
			const source = this.renderer.createElement('source');
			const sizeInfo = PHOTO_SIZES[size];
			source.srcset = `${this.picture}${sizeInfo.ext}`;
			source.media = sizeInfo.media;
			picture.appendChild(source);
		});

		const img = this.renderer.createElement('img');
		img.src = this.picture + '.jpg';

		picture.appendChild(img);
		this.renderer.appendChild(this.element.nativeElement, picture);
	}

}
