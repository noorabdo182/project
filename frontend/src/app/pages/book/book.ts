import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book implements OnInit {

  books: any[] = [];

  showForm = false;

  editMode = false;

  selectedBook: any = null;

  form = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    quantity: 1
  };

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {

    this.http.get<any>(
      'http://localhost:3000/api/books'
    ).subscribe({

      next: (response) => {

        console.log('BOOKS RESPONSE:', response);

        this.books = response.data;

        console.log(
          'BOOKS LENGTH:',
          this.books.length
        );

        this.changeDetector.detectChanges();

      },

      error: (error) => {

        console.error(
          'BOOKS ERROR:',
          error
        );

      }

    });

  }

  openAddForm(): void {

    this.editMode = false;

    this.selectedBook = null;

    this.form = {
      title: '',
      author: '',
      isbn: '',
      category: '',
      quantity: 1
    };

    this.showForm = true;
  }

  openEditForm(book: any): void {

    this.editMode = true;

    this.selectedBook = book;

    this.form = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      quantity: book.quantity
    };

    this.showForm = true;
  }

  closeForm(): void {

    this.showForm = false;

    this.editMode = false;

    this.selectedBook = null;

  }

  saveBook(): void {

    if (
      !this.form.title ||
      !this.form.author ||
      !this.form.isbn ||
      !this.form.category
    ) {

      alert('Please fill all fields');

      return;
    }

    if (this.form.quantity < 1) {

      alert('Quantity must be at least 1');

      return;
    }

    if (this.editMode) {

      this.http.put<any>(
        `http://localhost:3000/api/books/${this.selectedBook._id}`,
        this.form
      ).subscribe({

        next: (response) => {

          console.log(
            'UPDATE RESPONSE:',
            response
          );

          alert('Book updated successfully!');

          this.closeForm();

          this.getBooks();

        },

        error: (error) => {

          console.error(
            'UPDATE ERROR:',
            error
          );

          alert('Failed to update book');

        }

      });

    } else {

      this.http.post<any>(
        'http://localhost:3000/api/books',
        this.form
      ).subscribe({

        next: (response) => {

          console.log(
            'ADD RESPONSE:',
            response
          );

          alert('Book added successfully!');

          this.closeForm();

          this.getBooks();

        },

        error: (error) => {

          console.error(
            'ADD ERROR:',
            error
          );

          alert('Failed to add book');

        }

      });

    }

  }

  deleteBook(book: any): void {

    const confirmDelete = confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmDelete) {
      return;
    }

    this.http.delete<any>(
      `http://localhost:3000/api/books/${book._id}`
    ).subscribe({

      next: (response) => {

        console.log(
          'DELETE RESPONSE:',
          response
        );

        alert('Book deleted successfully!');

        this.getBooks();

      },

      error: (error) => {

        console.error(
          'DELETE ERROR:',
          error
        );

        alert('Failed to delete book');

      }

    });

  }

}