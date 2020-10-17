import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookCardComponent } from './book-card/book-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ComponentsModule } from './../../components/components.module';
import { NewBooksComponent } from './new-books/new-books.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookCardComponent,
    BookDetailComponent,
    NewBooksComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [BookCardComponent],
})
export class BooksModule {}
