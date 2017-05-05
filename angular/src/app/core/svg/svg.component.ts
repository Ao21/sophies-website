import { Component, OnInit, ElementRef } from '@angular/core';

import * as SVG from 'svg.js';

@Component({
	selector: 'app-svg',
	templateUrl: './svg.component.html',
	styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {
	element: Element;
	svg: SVG.Doc;
	polygon: SVG.Polygon;

	constructor(
		private el: ElementRef
	) { }

	ngOnInit() {
		this.element = this.el.nativeElement;
		this.svg = SVG('content')
			.size(0, 0)
			.addClass('clip-svg');

		this.polygon = this.svg
			.polygon('0 1, 0 0, 1 0, 0.8 1');

		const clip = this.svg.clip()
			.add(this.polygon)
			.id('clip-shape')
			.attr({ clipPathUnits: 'objectBoundingBox' });
	}

	doStuff() {
		this.polygon.animate(350).plot('0.3 1, 0 0, 1 0, 1 1');
	}

}
