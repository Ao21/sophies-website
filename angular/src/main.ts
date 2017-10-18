import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {
	removeNgStyles,
	createNewHosts,
	createInputTransfer,
	bootloader,
	hmrModule
} from '@angularclass/hmr';

if (environment.production) {
	enableProdMode();
}

const bootstrap = () => {
	return platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.then((ngModuleRef: any) => {
			// `module` global ref for webpackhmr
			// Don't run this in Prod
			return hmrModule(ngModuleRef, module);
		});
};

if (environment.hmr) {
	if (module['hot']) {
		bootloader(bootstrap);
	} else {
		console.error('HMR is not enabled for webpack-dev-server!');
		console.info('Are you using the --hmr flag for ng serve?');
	}
} else {
	bootstrap();
}
