/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// Gestures
export {GestureConfig} from './gestures/gesture-config';
// Explicitly specify the interfaces which should be re-exported, because if everything
// is re-exported, module bundlers may run into issues with treeshaking.
export {HammerInput, HammerManager} from './gestures/gesture-annotations';

export * from './core.module';
