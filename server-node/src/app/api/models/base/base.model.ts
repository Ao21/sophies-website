import BaseGqlFile from "./base.gql";
import { buildSchema, Source } from "graphql";


export class BaseResolve {
	hello() {
		return "Hello Worlds!";
	}
}

export class BaseModel {
	baseQuery: any;
	resolver: BaseResolve = new BaseResolve();
	constructor() {
		this.baseQuery = BaseGqlFile;
	}
}
