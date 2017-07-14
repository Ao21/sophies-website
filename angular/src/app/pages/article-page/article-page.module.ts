import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlePageComponent } from './article-page.component';
import { TemplatesModule } from './../../components/templates/templates.module';

@NgModule({
	imports: [CommonModule, TemplatesModule, RouterModule],
	declarations: [ArticlePageComponent],
	exports: [ArticlePageComponent]
})
export class ArticlePageModule {}
