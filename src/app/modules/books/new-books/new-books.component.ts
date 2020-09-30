import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Autor } from './../../../core/models/autor.model';
import { AutorsService } from './../../../core/services/autors.service';
//import {CdkTextareaAutosize} from '@angular/cdk/text-field'
import {MyToastrService} from './../../../core/services/toastr.service'

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
  stepAutorLabel: String = 'Autor'

  //@ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(private autorsService: AutorsService,
    private builder: FormBuilder,
    private toastr: MyToastrService) {}

  ngOnInit(): void {
    this.findAllAutors()
    this.initializeSelectAutorFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findAllAutors(): void {
    this.httpRequest = this.autorsService.findAllAutors().subscribe(
      response => {
        this.autores = response.body['autor'];
      },
      err => {
        console.log(err.error['message']);
      }
    );
  }

  initializeSelectAutorFormGroup(): void {
    this.autorFormGroup = this.builder.group({
      autor: this.builder.control(null, [Validators.required])
    })
  }

  initializeNewAutorFormGroup(): void {
    this.autorFormGroup = this.builder.group({
      nome: this.builder.control(null, [Validators.required]),
      imagemA: this.builder.control(null),
      biografia: this.builder.control(null)
    })
  }

  newAutor(): void {
    this.isNewAutor = !this.isNewAutor
    this.initializeNewAutorFormGroup()
  }

  selectAutor(): void {
    this.isNewAutor = !this.isNewAutor
    this.findAllAutors()
    this.initializeSelectAutorFormGroup()
  }

  nextStep(): void {
    if(this.isNewAutor) {
      this.createNewAutor(this.autorFormGroup.value)
    } else {
      // Definir o id no formulário de filme
      this.stepAutorLabel = `Autor: ${this.autorFormGroup.value['autor']['nome']}`
    }
  }

  createNewAutor(formValueAutor: Autor): void {
    this.httpRequest = this.autorsService.createNewAutor(formValueAutor).subscribe(response => {
      this.stepAutorLabel = `Autor: ${response.body['autor']['nome']}`
      this.toastr.showToastrSuccess(`O autor ${response.body['autor']['nome']} foi adicionado com sucesso.`)
    }, err => {
      this.toastr.showToastrError(`$(err.error['message'])`)
    })
  }
}
