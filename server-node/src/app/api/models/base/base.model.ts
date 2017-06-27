import BaseGqlFile from './base.gql';
import { buildSchema, Source } from 'graphql';

export class BaseModel {
	baseQuery: any;
	resolver: BaseResolve = new BaseResolve();
	constructor() {
		this.baseQuery = BaseGqlFile;
	}
}



export class BaseResolve {
	hello() {
		return 'Hello Worlds!';
	}
}
