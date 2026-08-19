import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(
      this.apiUrl,
      book
    );
  }

  updateBook(
    id: string,
    book: Partial<Book>
  ): Observable<Book> {
    return this.http.patch<Book>(
      `${this.apiUrl}/${id}`,
      book
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}