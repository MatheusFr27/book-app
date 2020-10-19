import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from './../../../core/services/books.service';
import { Livro } from './../../../core/models/livro.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBooksComponent } from '../update-books/update-books.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  private httpRequest: Subscription;
  Livro: Livro;
  hasError: boolean = false;
  bookName: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private BooksService: BooksService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bookName = this.activatedRoute.snapshot.params['bookName'];
    this.findBookByName(this.bookName);
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findBookByName(bookName: String): void {
    this.httpRequest = this.BooksService.findBookByName(bookName).subscribe(
      (response) => {
        this.Livro = response.body['livro'];
        console.log(response.body);
      },
      (err) => {
        this.hasError = true;
      }
    );
  }

  openUpdateBookModal(): void {
    const dialogRef = this.dialog.open(UpdateBooksComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
      data: this.Livro,
    });

    dialogRef.afterClosed().subscribe((updatedBook) => {
      if (updatedBook) {
        this.Livro = undefined;
        this.findBookByName(this.bookName);
      }
    });
  }
}
