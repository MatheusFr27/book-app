import { Component, OnDestroy, OnInit } from '@angular/core';
import { Autor } from '../../../core/models/autor.model';
import { AutorsService } from 'src/app/core/services/autors.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css'],
})
export class AuthorDetailComponent implements OnInit, OnDestroy {
  private httpRequest: Subscription;
  Author: Autor[];
  hasError: boolean = false;

  constructor(
    private service: AutorsService,
    private toastr: MyToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const authorName: String = this.activatedRoute.snapshot.params[
      'authorName'
    ];
    this.findAuthorByName(authorName);
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  countBooksOnAuthor(nBooks: Number): String {
    return nBooks > 1 ? `${nBooks} livros escritos` : `${nBooks} livro escrito`;
  }

  findAuthorByName(authorName: String): void {
    this.httpRequest = this.service.findAuthorByName(authorName).subscribe(
      (response) => {
        this.Author = response.body['autor'];
      },
      (err) => {
        this.toastr.showToastrError(`${err.status} - ${err.error.message}`);
        this.hasError = true;
      }
    );
  }

  titleBooksOnAuthor(nBooks: Number): String{
    if(nBooks > 1){
      return 'Livros criados pelo autor'
    } else if (nBooks == 1) {
      return 'Livro criado pelo autor'
    } else {
      return 'Não há livros criados pelo autor.'
    }
  }
}
