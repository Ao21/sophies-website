import {
	animate,
	AnimationEntryMetadata,
	state,
	keyframes,
	style,
	transition,
	trigger
} from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata = trigger(
	'routeAnimation',
	[
		state(
			'*',
			style({
				opacity: 1,
				transform: 'translateX(0)'
			})
		),
		transition(':enter', [
			style({
				opacity: 1,
				transform: 'translateY(100%)'
			}),
			animate('0.2s ease-in')
		]),
		transition(':leave', [
			animate(
				'0.5s ease-out',
				style({
					opacity: 1,
					transform: 'translateY(100%)'
				})
			)
		])
	]
);

export const scaleUpAnimation: AnimationEntryMetadata = trigger(
	'routeAnimation',
	[]
);
