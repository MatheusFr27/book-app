import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Autor } from './../../../core/models/autor.model';
import { AutorsService } from './../../../core/services/autors.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MyToastrService } from './../../../core/services/toastr.service';
import { BooksService } from './../../../core/services/books.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AutorValidator } from './../../../core/validators/autor.validator';
import { bookValidator } from './../../../core/validators/livro.validator';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.css'],
})
export class NewBooksComponent implements OnInit, OnDestroy {
  private httpRequest: Subscription;

  autorFormGroup: FormGroup;
  isNewAutor: boolean = false;
  autores: Autor[];
  stepAutorLabel: String = 'Autor';
  bookFormGroup: FormGroup;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(
    private autorsService: AutorsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private booksService: BooksService,
    private dialogRef: MatDialogRef<NewBooksComponent>,
    private autorValidator: AutorValidator,
    private bookValidator: bookValidator
  ) {}

  ngOnInit(): void {
    this.findAllAutors();
    this.initializeSelectAutorFormGroup();
    this.initializeBookFormGroup();
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findAllAutors(): void {
    this.httpRequest = this.autorsService.findAllAutors().subscribe(
      (response) => {
        this.autores = response.body['autor'];
      },
      (err) => {
        console.log(err.error['message']);
      }
    );
  }

  initializeSelectAutorFormGroup(): void {
    this.autorFormGroup = this.builder.group({
      autor: this.builder.control(null, [Validators.required]),
    });
  }

  initializeNewAutorFormGroup(): void {
    this.autorFormGroup = this.builder.group({
      nome: this.builder.control(
        null,
        [Validators.required],
        this.autorValidator.validatorUniqueAutorName()
      ),
      imagemA: this.builder.control(null),
      biografia: this.builder.control(null),
    });
  }

  initializeBookFormGroup(): void {
    this.bookFormGroup = this.builder.group({
      titulo: this.builder.control(
        null,
        [Validators.required],
        this.bookValidator.validatorUniqueBookName()
      ),
      editora: this.builder.control(null),
      tipo: this.builder.control(null, [Validators.required]),
      descricao: this.builder.control(null, [Validators.required]),
      imagemF: this.builder.control(null),
      autor: this.builder.control(null, [Validators.required]),
    });
  }

  newAutor(): void {
    this.isNewAutor = !this.isNewAutor;
    this.initializeNewAutorFormGroup();
  }

  selectAutor(): void {
    this.isNewAutor = !this.isNewAutor;
    this.findAllAutors();
    this.initializeSelectAutorFormGroup();
  }

  nextStep(): void {
    if (this.isNewAutor) {
      this.createNewAutor(this.autorFormGroup.value);
    } else {
      this.bookFormGroup.controls['autor'].setValue(
        this.autorFormGroup.value['autor']['_id']
      );
      this.stepAutorLabel = `Autor: ${this.autorFormGroup.value['autor']['nome']}`;
    }
  }

  createNewAutor(formValueAutor: Autor): void {
    this.httpRequest = this.autorsService
      .createNewAutor(formValueAutor)
      .subscribe(
        (response) => {
          this.bookFormGroup.controls['autor'].setValue(
            response.body['autor']['_id']
          );
          this.stepAutorLabel = `Autor: ${response.body['autor']['nome']}`;
          this.toastr.showToastrSuccess(
            `O autor ${response.body['autor']['nome']} foi adicionado com sucesso.`
          );
        },
        (err) => {
          this.toastr.showToastrError(`$(err.error['message'])`);
        }
      );
  }

  createNewBook(): void {
    this.httpRequest = this.booksService
      .createNewBook(this.bookFormGroup.value)
      .subscribe(
        (response) => {
          this.toastr.showToastrSuccess(
            `O filme ${['livro']['titulo']} foi adicionado com sucesso`
          );
          this.dialogRef.close(true);
        },
        (err) => {
          this.toastr.showToastrError(`$(err.error['message'])`);
          this.dialogRef.close(false);
        }
      );
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  autorNameExists(): boolean {
    return this.autorFormGroup.get('nome').hasError('autorNameAlreadyExists');
  }

  bookNameExists(): boolean {
    return this.bookFormGroup.get('nome').hasError('bookNameAlreadyExists');
  }
}
