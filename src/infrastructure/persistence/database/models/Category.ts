import { model, Schema } from 'mongoose';

export interface CategoryDocument extends Document {
  _id: string;
  name: string;
  description: string;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    _id: { type: String },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: '' },
  },
  { timestamps: true, _id: false }
);

export const CategoryModel = model<CategoryDocument>(
  'Category',
  CategorySchema
);
