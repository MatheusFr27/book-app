import { Component, OnInit, Input } from '@angular/core';
import {Livro} from './../../../core/models/livro.model'

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() Livro: Livro

  constructor() { }

  ngOnInit(): void {
  }

  sliceSnyposis(value: String): String{
    return `${value.slice(0, 100)}...`
  }

}
