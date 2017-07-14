import { CheckGetFieldResolve } from './checkGetField.resolve';
import { CheckGetBlockResolve } from './checkGetBlock.resolve';
import { CheckGetEntryResolve } from './checkGetEntry.resolve';
import { ArticlesResolve } from './articles.resolve';

export const RESOLVE_MODULES = [
	CheckGetFieldResolve,
	CheckGetBlockResolve,
	CheckGetEntryResolve,
	ArticlesResolve
];