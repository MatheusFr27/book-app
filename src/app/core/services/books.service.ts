import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { Livro } from './../models/livro.model';
import { API_URL } from './../api';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  findAllBooks(): Observable<HttpResponse<Livro[]>> {
    return this.http.get<Livro[]>(`${API_URL}/livro/visualizarTodosLivros`, {
      observe: 'response',
    });
  }

  findBookByName(bookName: String): Observable<HttpResponse<Livro>> {
    return this.http.get<Livro>(
      `${API_URL}/livro/visualizarUmLivro/${bookName}`,
      { observe: 'response' }
    );
  }

  createNewBook(body: Livro): Observable<HttpResponse<Livro>> {
    return this.http.post<Livro>(`${API_URL}/livro/criarLivro`, body, {
      observe: 'response',
    });
  }
}
