import mongoose, { Schema, Document } from "mongoose";

// Define the user schema

export interface IUser extends Document {
  name: string;
  password: string;
  token: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

export default mongoose.model<IUser>("User", userSchema);
