import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
