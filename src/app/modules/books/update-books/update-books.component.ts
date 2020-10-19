import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Livro } from 'src/app/core/models/livro.model';
import { Autor } from 'src/app/core/models/autor.model';
import { AutorsService } from 'src/app/core/services/autors.service';
import { BooksService } from 'src/app/core/services/books.service';
import { Subscription } from 'rxjs';
import { MyToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.css'],
})
export class UpdateBooksComponent implements OnInit, OnDestroy {
  private httpRequest: Subscription;

  Book: Livro;
  bookFormGroup: FormGroup;
  authors: Autor[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Livro,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateBooksComponent>,
    private authorsService: AutorsService,
    private booksServices: BooksService,
    private toastr: MyToastrService
  ) {
    this.Book = data;
  }

  ngOnInit(): void {
    this.findAllAuthors();
    this.initializeBookFormGroup();
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findAllAuthors(): void {
    this.httpRequest = this.authorsService.findAllAuthors().subscribe(
      (response) => {
        this.authors = response.body['autor'];
      },
      (err) => {
        this.toastr.showToastrError(`${err.status} - ${err.error['message']}`);
      }
    );
  }

  initializeBookFormGroup(): void {
    this.bookFormGroup = this.builder.group({
      tipo: this.builder.control(null, [Validators.required]),
      imagemF: this.builder.control(null),
      descricao: this.builder.control(null, [Validators.required]),
      editora: this.builder.control(null),
      autor: this.builder.control(null, [Validators.required]),
    });
  }

  populateBookFormGroup(): void {
    this.bookFormGroup.patchValue({
      tipo: this.Book['tipo'],
      imagemF: this.Book['imagemF'],
      descricao: this.Book['descricao'],
      autor: this.Book['autor'],
      editora: this.Book['editora'],
    });
  }

  compareAuthor(a1: Autor, a2: Autor): boolean {
    return a1 && a2 ? a1._id === a2._id : a1 === a2;
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b);
  }

  updateBook() {
    this.httpRequest = this.booksServices.updateBookById(this.Book['_id'], this.bookFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O livro ${this.Book['nome']} foi atualizado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

}
