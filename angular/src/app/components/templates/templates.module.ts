import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTemplatesModule } from './articles/article-templates.module';
import { TemplateGetterComponent } from './template-getter/template-getter.component';

@NgModule({
	imports: [CommonModule, ArticleTemplatesModule],
	declarations: [TemplateGetterComponent],
	exports: [ArticleTemplatesModule, TemplateGetterComponent]
})
export class TemplatesModule {}
