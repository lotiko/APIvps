import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IRecord {
  [key: string]: string[] | number;
  name: string[];
  score: number;
}
export interface IRecords {
  [key: string]: string | IRecord;
  size: string;
  record1: IRecord;
  record2: IRecord;
  record3: IRecord;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IRecords>({
  size: { type: String, required: true },
  record1: {
    name: { type: [String], required: true },
    score: { type: Number, required: true },
  },
  record2: {
    name: { type: [String], required: true },
    score: { type: Number, required: true },
  },
  record3: {
    name: { type: [String], required: true },
    score: { type: Number, required: true },
  },
});

// 3. Create a Model.
const records = model<IRecords>("Records", schema);
export default records;
