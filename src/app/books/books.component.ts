import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  books: Book[] = [];
  editState = false;


  constructor(private services: BooksService, private route: ActivatedRoute) { }


  ngOnInit(): void {


    this.editState = false;

    // Get Books from services
    this.loadBooks();


  }

  loadBooks() {
    this.services.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    })
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  onAddBook(form: NgForm) {

    const book: Book = new Book(
      form.value.title,
      form.value.subtitle,
      form.value.author,
      form.value.image,
      form.value.id
    );

    if (this.editState) {
      // this.services.editBook(book);
    } else {
      this.services.createBook(book).subscribe((data: {}) => {
        this.loadBooks();
      })    }

    this.onResetForm();
    this.editState = false;
  }

  addbook(book) {
    this.services.createBook(book).subscribe((data: {}) => {
      this.loadBooks();
    })
  }

  onResetForm() {
    this.form.reset();
    this.editState = false;
  }


  // Delete book
  onDelete(id) {
    if (window.confirm('Are you sure you want to delete this Book?')){
      this.services.deleteBook(id).subscribe(data => {
        this.loadBooks()
      })
    }
  }


}
