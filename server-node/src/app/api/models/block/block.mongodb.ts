import * as mongoose from "mongoose";
import { RepositoryBase } from "./../../../common/mongo/generic-repository";
import { BlockModel } from "./block.model";

export const BlockSchema = new mongoose.Schema({
    name: String,
    fields: [{ type: mongoose.Schema.Types.ObjectId, ref: "Field" }]
});

BlockSchema.virtual("id").get(() => this.id);
BlockSchema.set("toObject", { virtuals: true });
BlockSchema.set("toJSON", { virtuals: true });

export const Block = mongoose.model("Block", BlockSchema, "Blocks");

export class BlockRepository extends RepositoryBase<BlockModel> {
    constructor() {
        super(Block);
    }
}
