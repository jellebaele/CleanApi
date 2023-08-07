import { model, Schema } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
  description: string;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: '' },
  },
  { timestamps: true }
);

export const CategoryModel = model<CategoryDocument>(
  'Category',
  CategorySchema
);
