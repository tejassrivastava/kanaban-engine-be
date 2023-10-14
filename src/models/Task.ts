import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  assignedTo: { type: String },
  category: { type: String },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

export default mongoose.model<ITask>("Task", taskSchema);
