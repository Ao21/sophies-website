import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryListModule } from './entry-list/entry-list.module';
import { EntryListItemModule } from './entry-list-item/entry-list-item.module';
import { EntryListHeaderModule } from './entry-list-header/entry-list-header.module';
import { AssetManagerModule } from './asset-manager/asset-manager.module';
import { FieldListModule } from './field-list/field-list.module';
import { BlockSelectorModule } from './block-selector/block-selector.module';
import { ArticlePreviewModule } from './article-preview/article-preview.module';
import { BlockModule } from './block/block.module';

@NgModule({
	imports: [
		CommonModule,
		EntryListModule,
		AssetManagerModule,
		FieldListModule,
		BlockSelectorModule,
		BlockModule,
		ArticlePreviewModule
	],
	declarations: [],
	exports: [
		EntryListModule,
		AssetManagerModule,
		FieldListModule,
		BlockSelectorModule,
		BlockModule,
		ArticlePreviewModule
	]
})
export class ObjectsModule {}
