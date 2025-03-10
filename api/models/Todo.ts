import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  status: string;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
},  { timestamps: true });

export default mongoose.model<ITodo>("Product", ProductSchema);
