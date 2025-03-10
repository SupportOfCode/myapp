import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  title: string;
  img: string;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
},  { timestamps: true });

export default mongoose.model<IProduct>("Product", ProductSchema);
