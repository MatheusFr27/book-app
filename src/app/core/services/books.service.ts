import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  validatorUniqueBookName(bookName: string) {
    let myParams = new HttpParams();
    myParams = myParams.append('nome', bookName);
    return this.http.get<any>(`${API_URL}/livro/validarTituloLivro`, {
      params: myParams,
    });
  }

  updateBookById(bookId: String, body: Livro): Observable<HttpResponse<Livro>> {
    return this.http.put<Livro>(
      `${API_URL}/livro/atualizarLivro/${bookId}`,
      body,
      { observe: 'response' }
    );
  }
}
