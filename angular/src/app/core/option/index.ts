/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdSelectionModule} from '../selection/index';
import {Option} from './option';
import {MdOptgroup} from './optgroup';


@NgModule({
  imports: [ CommonModule, MdSelectionModule],
  exports: [Option, MdOptgroup],
  declarations: [Option, MdOptgroup]
})
export class OptionModule {}


export * from './option';
export * from './optgroup';
