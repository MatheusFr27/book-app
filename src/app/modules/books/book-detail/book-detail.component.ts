import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from './../../../core/services/books.service';
import { Livro } from './../../../core/models/livro.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  private httpRequest: Subscription;
  Livro: Livro;

  constructor(
    private activatedRoute: ActivatedRoute,
    private BooksService: BooksService
  ) {}

  ngOnInit(): void {
    const bookName = this.activatedRoute.snapshot.params['bookName'];
    this.findBookByName(bookName);
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findBookByName(bookName: String): void {
    this.httpRequest = this.BooksService.findBookByName(bookName).subscribe(
      response => {
        this.Livro = response.body['livro'];
        console.log(response.body)
      },
      err => {
        console.log(err);
      })
  }
}
