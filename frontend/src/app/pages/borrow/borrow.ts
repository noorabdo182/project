
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Book {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  available: boolean;
}

interface Borrow {
  _id: string;
  book: Book;
  borrowerName: string;
  borrowDate: string;
  returnDate?: string;
  returned: boolean;
}

@Component({
  selector: 'app-borrow',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './borrow.html',
  styleUrl: './borrow.css'
})
export class borrow implements OnInit {

  books: Book[] = [];
  borrows: Borrow[] = [];

  selectedBookId = '';
  borrowerName = '';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getBorrows();
  }

  getBooks(): void {

    this.http.get<any>(
      'http://localhost:3000/api/books'
    ).subscribe({

      next: (response) => {
        this.books = response.data;
      },

      error: (error) => {
        console.error(
          'GET BOOKS ERROR:',
          error
        );
      }

    });
  }

  getBorrows(): void {

    this.http.get<any>(
      'http://localhost:3000/api/borrows'
    ).subscribe({

      next: (response) => {
        this.borrows = response.data;
      },

      error: (error) => {
        console.error(
          'GET BORROWS ERROR:',
          error
        );
      }

    });
  }

  borrowBook(): void {

    if (!this.selectedBookId || !this.borrowerName) {
      alert('Please select a book and enter borrower name.');
      return;
    }

    const borrowData = {
      bookId: this.selectedBookId,
      borrowerName: this.borrowerName
    };

    this.http.post<any>(
      'http://localhost:3000/api/borrows',
      borrowData
    ).subscribe({

      next: () => {

        alert('Book borrowed successfully!');

        this.selectedBookId = '';
        this.borrowerName = '';

        this.getBooks();
        this.getBorrows();

      },

      error: (error) => {

        console.error(
          'BORROW ERROR:',
          error
        );

        alert(
          error.error?.message ||
          'Failed to borrow book.'
        );

      }

    });
  }

  returnBook(id: string): void {

    this.http.patch<any>(
      `http://localhost:3000/api/borrows/${id}/return`,
      {}
    ).subscribe({

      next: () => {

        alert('Book returned successfully!');

        this.getBooks();
        this.getBorrows();

      },

      error: (error) => {

        console.error(
          'RETURN ERROR:',
          error
        );

        alert(
          error.error?.message ||
          'Failed to return book.'
        );

      }

    });
  }
}