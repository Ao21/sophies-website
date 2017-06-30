import { NgModule } from '@angular/core';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CmsModule } from './cms/cms.module';

@NgModule({
	imports: [PortfolioModule, CmsModule],
	declarations: [],
	exports: [PortfolioModule, CmsModule]
})
export class OutletsModule {}
