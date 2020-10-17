import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from '../../components/components.module';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { AuthorCardComponent } from './author-card/author-card.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';

@NgModule({
  declarations: [AuthorsComponent, AuthorCardComponent, AuthorDetailComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
  ],
})
export class AuthorsModule {}
