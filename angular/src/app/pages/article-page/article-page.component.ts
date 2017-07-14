import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Block } from './../../queries/blocks.query';
import { Entry } from './../../queries/entries.query';

@Component({
	selector: 'article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
	@Input() blocks: Block[];
	@Input() article: Entry;

	constructor(route: ActivatedRoute, private titleService: Title) {
		route.data.subscribe(({ article }: {article: Entry}) => {
			this.article = article;
			this.titleService.setTitle(`S. ${article.title}`);
			this.blocks = article.blocks;
		});
	}

	ngOnInit() {}
}
