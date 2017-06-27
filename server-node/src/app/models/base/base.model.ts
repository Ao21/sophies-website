import query from "./base.gql";

export class BaseModel {
    public root = query;

    constructor() {
        console.log(query);
    }
}
