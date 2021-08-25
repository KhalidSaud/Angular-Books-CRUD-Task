import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { from, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  apiURL = 'https://61067a051f3487001743792a.mockapi.io/api/v1/Books';

  book: Book = {title : '', subtitle: '', author: '', image: '', id: ''};

  books: Book[] = [
    {title : 'Book 1', subtitle: 'This is book 1', author: 'Author 1', image: 'Image 1', id: '1'},
    {title : 'Book 2', subtitle: 'This is book 2', author: 'Author 2', image: 'Image 2', id: '2'},
    {title : 'Book 3', subtitle: 'This is book 3', author: 'Author 3', image: 'Image 3', id: '3'},
    {title : 'Book 4', subtitle: 'This is book 4', author: 'Author 4', image: 'Image 4', id: '4'},
  ];

  constructor(private http: HttpClient) { }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

  addBook(book: Book) {
    // Add Book
    this.books.push(book);

  }

  createBook(book): Observable<Book> {
    return this.http.post<Book>(this.apiURL, JSON.stringify(book), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  editBook(book: Book) {
    // TODO: Edit Book
  }

  deleteBook(id: string) {
    // Delete Book
    return this.http.delete<Book>(this.apiURL +'/'+ id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
