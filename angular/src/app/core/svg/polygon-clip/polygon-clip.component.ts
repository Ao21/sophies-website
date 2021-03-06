import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ScrollDispatcher } from './../../positioning/scroll-dispatcher';
import { SHAPES } from './../shape-constants';
import * as SVG from 'svgjs';

/**
 * Polygon Clip Component
 *
 * Creates an SVG Clip path of an Image using a point array
 *
 * Example:
 * 		<polygon-clip from="0 1, 0 1, 0 1" to="1 0, 0 1, 1 0, 0 1">
 *			<img src="BLAH" />
 * 		</polygon-clip>
 *
 * Input Params
 * @param from {string} Either a point array in string from or an enum from the Shape Constants
 * @param to {string} Either a point array in string from or an enum from the Shape Constants
 */

@Component({
	selector: 'polygon-clip',
	templateUrl: './polygon-clip.component.html',
	styleUrls: ['./polygon-clip.component.scss']
})
export class PolygonClipComponent implements OnInit {
	element: Element;
	svg: SVG.Doc;
	polygon: SVG.Polygon;

	@Input() from: string;
	@Input() to: string;

	constructor(
		private el: ElementRef,
		private scrollDispatcher: ScrollDispatcher
	) { }

	ngOnInit() {
		this.element = this.el.nativeElement;

		this.from = SHAPES[this.from] ? SHAPES[this.from] : this.from;
		this.to = SHAPES[this.to] ? SHAPES[this.to] : this.to;

		this.svg = SVG('content')
			.size(0, 0)
			.addClass('clip-svg');

		this.polygon = this.svg
			.polygon(this.from);

		const clip = this.svg.clip()
			.add(this.polygon)
			.id('clip-shape')
			.attr({ clipPathUnits: 'objectBoundingBox' });

	}


	doStuff() {
		if (this.to) {
			this.polygon.animate(350).plot(this.to);
		}
	}

}
