
import { Request, Response } from 'express';
import { Borrow } from '../models/borrow';
import { Book } from '../models/book model';

export const createBorrow = async (
  request: Request,
  response: Response
): Promise<void> => {

  try {

    const {
      bookId,
      borrowerName
    } = request.body;

    if (!bookId || !borrowerName) {
      response.status(400).json({
        success: false,
        message: 'bookId and borrowerName are required'
      });

      return;
    }

    const book = await Book.findById(bookId);

    if (!book) {
      response.status(404).json({
        success: false,
        message: 'Book not found'
      });

      return;
    }

    if (book.quantity <= 0) {
      response.status(400).json({
        success: false,
        message: 'Book is not available'
      });

      return;
    }

    book.quantity -= 1;

    book.available = book.quantity > 0;

    await book.save();

    const borrow = await Borrow.create({
      book: book._id,
      borrowerName,
      borrowDate: new Date(),
      returned: false
    });

    response.status(201).json({
      success: true,
      data: borrow
    });

  } catch (error) {

    console.error('CREATE BORROW ERROR:', error);

    response.status(500).json({
      success: false,
      message: 'Failed to borrow book'
    });

  }
};


export const getBorrows = async (
  _request: Request,
  response: Response
): Promise<void> => {

  try {

    const borrows = await Borrow.find()
      .populate('book');

    response.json({
      success: true,
      count: borrows.length,
      data: borrows
    });

  } catch (error) {

    console.error('GET BORROWS ERROR:', error);

    response.status(500).json({
      success: false,
      message: 'Failed to get borrows'
    });

  }
};


export const returnBook = async (
  request: Request,
  response: Response
): Promise<void> => {

  try {

    const { id } = request.params;

    const borrow = await Borrow.findById(id);

    if (!borrow) {
      response.status(404).json({
        success: false,
        message: 'Borrow record not found'
      });

      return;
    }

    if (borrow.returned) {
      response.status(400).json({
        success: false,
        message: 'Book has already been returned'
      });

      return;
    }

    const book = await Book.findById(borrow.book);

    if (!book) {
      response.status(404).json({
        success: false,
        message: 'Book not found'
      });

      return;
    }

    book.quantity += 1;

    book.available = true;

    await book.save();

    borrow.returned = true;
    borrow.returnDate = new Date();

    await borrow.save();

    response.json({
      success: true,
      data: borrow
    });

  } catch (error) {

    console.error('RETURN BOOK ERROR:', error);

    response.status(500).json({
      success: false,
      message: 'Failed to return book'
    });

  }
};