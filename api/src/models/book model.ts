import {
  model,
  Schema
} from "mongoose";

export interface BookDocument {
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema =
  new Schema<BookDocument>(
    {
      title: {
        type: String,
        required: true,
        trim: true
      },

      author: {
        type: String,
        required: true,
        trim: true
      },

      isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },

      category: {
        type: String,
        required: true,
        trim: true
      },

      quantity: {
        type: Number,
        required: true,
        min: 0
      },

      available: {
        type: Boolean,
        default: true
      }
    },

    {
      timestamps: true
    }
  );

export const Book =
  model<BookDocument>(
    "Book",
    bookSchema
  );