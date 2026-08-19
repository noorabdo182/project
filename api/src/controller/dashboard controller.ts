import { Request, Response } from 'express';
import { Book } from '../models/book model';
import { Borrow } from '../models/borrow';

export const getDashboard = async (
  _request: Request,
  response: Response
): Promise<void> => {
  try {
    const totalBooks = await Book.countDocuments();

    const availableBooks = await Book.countDocuments({
      available: true
    });

    const unavailableBooks = await Book.countDocuments({
      available: false
    });

    const totalBorrows = await Borrow.countDocuments({
      returned: false
    });

    response.json({
      success: true,
      data: {
        totalBooks,
        availableBooks,
        unavailableBooks,
        totalBorrows
      }
    });

  } catch (error) {
    console.error('DASHBOARD ERROR:', error);

    response.status(500).json({
      success: false,
      message: 'Failed to get dashboard data'
    });
  }
};