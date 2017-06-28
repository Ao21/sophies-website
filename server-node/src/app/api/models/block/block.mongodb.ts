import * as mongoose from "mongoose";

export const BlockSchema = new mongoose.Schema({
	name: String,
	fields: [{ type: mongoose.Schema.Types.ObjectId, ref: "Field" }]
})

export const Block = mongoose.model("Block", BlockSchema);
