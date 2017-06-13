import { Routes } from "@angular/router";
import { ArticlePageComponent } from "./article-page.component";

export const ArticlePageRoutes: Routes = [
	{
		path: "article",
		component: ArticlePageComponent,
		canActivate: [],
		resolve: {}
	}
];
