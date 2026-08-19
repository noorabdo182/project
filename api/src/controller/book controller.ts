import type {
  Request,
  Response
} from "express";

import {
  Book
} from "../models/book model";

// Create a new book
export async function createBook(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const book =
      await Book.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: book
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create book"
    });

  }
}

// Get all books
export async function getBooks(
  _request: Request,
  response: Response
): Promise<void> {

  const books =
    await Book
      .find()
      .sort({
        createdAt: -1
      });

  response.json({
    success: true,
    count: books.length,
    data: books
  });
}

// Get a book by ID
export async function getBookById(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const book =
      await Book.findById(
        request.params.id
      );

    if (!book) {

      response.status(404).json({
        success: false,
        message: "Book not found"
      });

      return;
    }

    response.json({
      success: true,
      data: book
    });

  } catch {

    response.status(400).json({
      success: false,
      message: "Invalid book id"
    });

  }
}

// Update a book by ID
export async function updateBook(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const book =
      await Book.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!book) {

      response.status(404).json({
        success: false,
        message: "Book not found"
      });

      return;
    }

    response.json({
      success: true,
      data: book
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update book"
    });

  }
}

// Delete a book by ID
export async function deleteBook(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const book =
      await Book.findByIdAndDelete(
        request.params.id
      );

    if (!book) {

      response.status(404).json({
        success: false,
        message: "Book not found"
      });

      return;
    }

    response.json({
      success: true,
      message: "Book deleted"
    });

  } catch {

    response.status(400).json({
      success: false,
      message: "Invalid book id"
    });

  }
}


