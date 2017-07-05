/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export * from './style/index';
export * from './selection/index';
export {
	CompatibilityModule,
	NoConflictStyleCompatibilityMode
} from './compatibility/compatibility';

// Placeholder
export {
	FloatPlaceholderType,
	PlaceholderOptions,
	MD_PLACEHOLDER_GLOBAL_OPTIONS
} from './placeholder/placeholder-options';

export * from './keyboard/keycodes';
export * from './compatibility/compatibility';

// Selection
export * from './selection/selection';

export * from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';

export { A11yModule } from './a11y/index';

// a11y
export {
	AriaLivePoliteness,
	LiveAnnouncer,
	LIVE_ANNOUNCER_ELEMENT_TOKEN,
	LIVE_ANNOUNCER_PROVIDER
} from './a11y/live-announcer';

// Platform
export * from './platform/index';

// Overlay
export * from './overlay/index';

export * from './option/index';

// Portals
export {
	Portal,
	PortalHost,
	BasePortalHost,
	ComponentPortal,
	TemplatePortal
} from './portal/portal';
export {
	PortalHostDirective,
	TemplatePortalDirective,
	PortalModule
} from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';

// Gestures
export { GestureConfig } from './gestures/gesture-config';
// Explicitly specify the interfaces which should be re-exported, because if everything
// is re-exported, module bundlers may run into issues with treeshaking.
export { HammerInput, HammerManager } from './gestures/gesture-annotations';

export {
	UniqueSelectionDispatcher,
	UniqueSelectionDispatcherListener,
	UNIQUE_SELECTION_DISPATCHER_PROVIDER
} from './coordination/unique-selection-dispatcher';

export * from './core.module';
