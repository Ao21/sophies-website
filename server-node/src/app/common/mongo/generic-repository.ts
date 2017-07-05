import * as mongoose from "mongoose";
export interface IRead<T> {
    retrieve: () => void;
    findById: (_id: string) => mongoose.Query<T>;
    findOne(cond?: Object): mongoose.Query<T>;
    find(cond: Object, fields: Object, options: Object): mongoose.Query<T[]>;
}

export interface IWrite<T> {
    create: (item: T) => void;
    update: (_id: string, item: T) => void;
    delete: (_id: string) => void;
}

export class RepositoryBase<T extends mongoose.Document>
    implements IRead<T>, IWrite<T> {
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T) {
        return this._model.create(item);
    }

    retrieve() {
        return this._model.find({});
    }

    update(_id: string, item: T) {
        console.log(_id, item);
        return this._model.update({ _id: _id }, item);
    }

    delete(_id: string) {
        return this._model.remove({ _id: this.toObjectId(_id) });
    }

    findById(_id: string): mongoose.Query<T> {
        return this._model.findById(_id);
    }

    findOne(cond?: Object): mongoose.Query<T> {
        return this._model.findOne(cond);
    }

    find(
        cond?: Object,
        fields?: Object,
        options?: Object
    ): mongoose.Query<T[]> {
        return this._model.find(cond, options);
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
