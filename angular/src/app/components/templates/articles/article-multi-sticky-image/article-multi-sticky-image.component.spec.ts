import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ArticleMultiStickyImageComponent } from "./article-multi-sticky-image.component";

describe("ArticleMultiStickyImageComponent", () => {
	let component: ArticleMultiStickyImageComponent;
	let fixture: ComponentFixture<ArticleMultiStickyImageComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ArticleMultiStickyImageComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ArticleMultiStickyImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should be created", () => {
		expect(component).toBeTruthy();
	});
});
