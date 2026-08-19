
import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  borrowerName: string;
  borrowDate: Date;
  returnDate?: Date;
  returned: boolean;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },

    borrowerName: {
      type: String,
      required: true,
      trim: true
    },

    borrowDate: {
      type: Date,
      default: Date.now
    },

    returnDate: {
      type: Date
    },

    returned: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Borrow = mongoose.model<IBorrow>(
  'Borrow',
  borrowSchema
);