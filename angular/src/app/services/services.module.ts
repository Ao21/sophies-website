import { AuthService } from './auth.service';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { authHttpServiceFactory } from './../core/auth/auth.httpfactory';

import { FieldService } from './fields.service';
export const SERVICES_MODULE = [
	AuthService,
	FieldService
];
