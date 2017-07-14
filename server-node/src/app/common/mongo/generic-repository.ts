import * as mongoose from "mongoose";


export class RepositoryBase<T extends mongoose.Document> {
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T) {
        console.log('create' ,item);
        return this._model.create(item);
    }

    retrieve() {
        return this._model.find({});
    }

    update(_id: string, item: T) {
        return this._model.update({ _id: _id }, item);
    }

    delete(_id: string) {
        return this._model.remove({ _id: this.toObjectId(_id) });
    }

    findById(_id: string) {
        return this._model.findById(_id);
    }


    findOne(cond?: Object){
        return this._model.findOne(cond);
    }

    find(
        cond?: Object,
        fields?: Object,
        options?: Object
    ) {
        return this._model.find(cond, options);
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
