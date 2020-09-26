import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs'
import {Livro} from './../../core/models/livro.model'
import {BooksService} from './../../core/services/books.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Livros: Livro[]

  constructor(
    private booksServices: BooksService
  ) { }

  ngOnInit(): void {
    this.findAllBooks()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllBooks(): void {
    this.httpRequest = this.booksServices.findAllBooks().subscribe(response => {
      this.Livros = response.body['livro']
    }, err => {
      console.log(err)
    })
  }

}
