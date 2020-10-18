import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from '../../components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { AuthorCardComponent } from './author-card/author-card.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { BooksModule } from './../books/books.module';
import { NewAuthorComponent } from './new-author/new-author.component';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorCardComponent,
    AuthorDetailComponent,
    NewAuthorComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    BooksModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class AuthorsModule {}
