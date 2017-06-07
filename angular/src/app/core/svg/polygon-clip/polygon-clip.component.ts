import { Component, OnInit, ElementRef } from '@angular/core';
import { ScrollDispatcher } from './../../positioning/scroll-dispatcher';
import { XSHAPE } from './../shape-constants';
import * as SVG from 'svg.js';


@Component({
	selector: 'polygon-clip',
	templateUrl: './polygon-clip.component.html',
	styleUrls: ['./polygon-clip.component.scss']
})
export class PolygonClipComponent implements OnInit {
	element: Element;
	svg: SVG.Doc;
	polygon: SVG.Polygon;

	constructor(
		private el: ElementRef,
		private scrollDispatcher: ScrollDispatcher
	) { }

	ngOnInit() {
		this.element = this.el.nativeElement;
		this.svg = SVG('content')
			.size(0, 0)
			.addClass('clip-svg');

		this.polygon = this.svg
			.polygon('0 0, 0, 1, 0.7 1, 1 0.7, 1 0');

		const clip = this.svg.clip()
			.add(this.polygon)
			.id('clip-shape')
			.attr({ clipPathUnits: 'objectBoundingBox' });

		// this.scrollDispatcher.scrolled(0, () => {
		// 	const positionFromTop = this.element.getBoundingClientRect().top;
		// 	this.updatePosition(positionFromTop);
		// });

	}

	updatePosition(top: number) {
		const mappedPosition = Math.max(Math.min(300, -top), 0);
		const rangedPosition = this.convertToRange(mappedPosition, [0, 300], [0, 1]);

		this.polygon.plot(`${0.3 * rangedPosition} 0, 0, 1, 1 ${1 * rangedPosition} 1, 1 0`);
	}

	convertToRange(value, srcRange, dstRange) {
		// value is outside source range return
		if (value < srcRange[0] || value > srcRange[1]) {
			return NaN;
		}

		const srcMax = srcRange[1] - srcRange[0],
			dstMax = dstRange[1] - dstRange[0],
			adjValue = value - srcRange[0];

		return (adjValue * dstMax / srcMax) + dstRange[0];

	}

	doStuff() {
		this.polygon.animate(350).plot('0.3 0, 0, 1, 1 1, 1 0');
	}

}
