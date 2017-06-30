import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {} from 'rxjs/Rx';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
	auth0 = new auth0.WebAuth({
		clientID: 'EWmZa67nIYCsfI3K0gA6Z99U6pW3VqQ0',
		domain: 'sophie-website.auth0.com',
		responseType: 'token id_token',
		audience: 'https://sophie-website.auth0.com/userinfo',
		redirectUri: 'http://localhost:4200/cms',
		scope: 'openid'
	});

	constructor(public router: Router) {}

	public login(): void {
		this.auth0.authorize();
	}

	public handleAuthentication(): void {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				window.location.hash = '';
				this.setSession(authResult);
				this.router.navigate(['/cms/entries']);
			} else if (err) {
				this.router.navigate(['/']);
				console.log(err);
			}
		});
	}

	private setSession(authResult): void {
		// Set the time that the access token will expire at
		const expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
	}

	public logout(): void {
		// Remove tokens and expiry time from localStorage
		localStorage.removeItem('access_token');
		localStorage.removeItem('token');
		localStorage.removeItem('expires_at');
		// Go back to the home route
		this.router.navigate(['/']);
	}

	public isAuthenticated(): boolean {
		// Check whether the current time is past the
		// access token's expiry time
		const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	}
}
