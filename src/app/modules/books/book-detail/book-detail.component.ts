import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from './../../../core/services/books.service';
import { Livro } from './../../../core/models/livro.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBooksComponent } from '../update-books/update-books.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import { Route } from '@angular/compiler/src/core';

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
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
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

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '210px',
      data: `Deseja apagar o livro ${this.Livro['titulo']}? A ação é irreversível!`,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteBook(this.Livro['_id']);
      }
    });
  }

  deleteBook(bookId: String): void {
    this.httpRequest = this.BooksService.deleteBookById(bookId).subscribe(
      (response) => {
        this.toastr.showToastrSuccess(
          `O filme ${this.Livro['titulo']} foi apagado com sucesso.`
        );
        this.route.navigate(['/books']);
      },
      (err) => {
        this.toastr.showToastrError(`${err.status} - ${err.error['message']}`);
      }
    );
  }
}
