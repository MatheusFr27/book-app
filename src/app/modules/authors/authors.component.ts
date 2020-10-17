import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/core/models/autor.model';
import { AutorsService } from 'src/app/core/services/autors.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  private httpRequest: Subscription;

  authors: Autor[];
  hasError: boolean = false;

  constructor(
    private service: AutorsService,
    private toastr: MyToastrService
  ) {}

  ngOnInit(): void {
    this.findAllAuthors();
    console.log(this.authors);
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findAllAuthors(): void {
    this.httpRequest = this.service.findAllAuthors().subscribe(
      (response) => {
        this.authors = response.body['autor'];
        console.log(this.authors);
      },
      (err) => {
        this.hasError = true;
        this.toastr.showToastrError(`${err.status} - ${err.error.message}`);
      }
    );
  }
}
