import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlePreviewComponent } from './article-preview.component';
import { ArticlePageModule } from './../../../pages/article-page/article-page.module';
import { PipesModule } from './../../../core/pipes/pipes.module';
import { TemplatesModule } from './../../templates/templates.module';


@NgModule({
	imports: [CommonModule, PipesModule, TemplatesModule, RouterModule],
	declarations: [ArticlePreviewComponent],
	exports: [ArticlePreviewComponent]
})
export class ArticlePreviewModule {}
