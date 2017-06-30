import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";

console.log(jwksRsa);

const secret = jwksRsa.expressJwtSecret({
	cache: true,
	rateLimit: true,
	jwksRequestsPerMinute: 5,
	jwksUri: `https://sophie-website.auth0.com/.well-known/jwks.json`
});

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
export const checkJwt = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the singing keys provided by the JWKS endpoint.

	secret: secret,

	// Validate the audience and the issuer.
	// audience: "http://localhost:4200/",
	issuer: `https://sophie-website.auth0.com/`,
	algorithms: ["RS256"]
});
