import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/core/models/autor.model';
import { AutorsService } from 'src/app/core/services/autors.service';
import { MyToastrService } from 'src/app/core/services/toastr.service';
import { NewAuthorComponent } from './new-author/new-author.component';

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
    private toastr: MyToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.findAllAuthors();
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe();
  }

  findAllAuthors(): void {
    this.httpRequest = this.service.findAllAuthors().subscribe(
      (response) => {
        this.authors = response.body['autor'];
      },
      (err) => {
        this.hasError = true;
        this.toastr.showToastrError(`${err.status} - ${err.error.message}`);
      }
    );
  }

  openNewAuthorModal(): void {
    const dialogRef = this.dialog.open(NewAuthorComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(newAuthorAdded => {
      if(newAuthorAdded){
        this.authors = undefined
        this.findAllAuthors()
      }
    })
  }
}
