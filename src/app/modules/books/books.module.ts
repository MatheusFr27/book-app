import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookCardComponent } from './book-card/book-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BookDetailComponent } from './book-detail/book-detail.component'

@NgModule({
  declarations: [BooksComponent, BookCardComponent, BookDetailComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class BooksModule { }
