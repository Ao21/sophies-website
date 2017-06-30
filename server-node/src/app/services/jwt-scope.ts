function error(res: any) {
	return res.send(401, "Insufficient scope");
}

export function checkScopes(expectedScopes: any): any {
	if (!Array.isArray(expectedScopes)) {
		throw new Error(
			"Parameter expectedScopes must be an array of strings representing the scopes for the endpoint(s)"
		);
	}

	return function(req: any, res: any, next: any) {
		if (expectedScopes.length === 0) {
			return next();
		}
		if (!req.user || typeof req.user.scope !== "string") {
			return error(res);
		}
		const scopes = req.user.scope.split(" ");
		const allowed = expectedScopes.some(function(scope) {
			return scopes.indexOf(scope) !== -1;
		});

		return allowed ? next() : error(res);
	};
}
