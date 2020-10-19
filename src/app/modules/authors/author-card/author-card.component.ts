import { Component, OnInit, Input } from '@angular/core';
import { Autor } from 'src/app/core/models/autor.model';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css'],
})
export class AuthorCardComponent implements OnInit {
  @Input() Author: Autor;

  constructor() {}

  ngOnInit(): void {}

  countBooksOnAuthor(nBooks: Number): String {
    return nBooks > 1 ? `${nBooks} livros escritos` : `${nBooks} livro escrito`;
  }

  sliceBiography(value: String): String {
    return `${value.slice(0, 100)}...`;
  }
}
