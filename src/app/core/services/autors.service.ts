import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from './../models/autor.model';
import { API_URL } from './../api';

@Injectable({
  providedIn: 'root',
})
export class AutorsService {
  constructor(private http: HttpClient) {}

  findAllAuthors(): Observable<HttpResponse<Autor[]>> {
    return this.http.get<Autor[]>(`${API_URL}/autor/visualizarTodosAutores`, {
      observe: 'response',
    });
  }

  createNewAutor(body: Autor): Observable<HttpResponse<Autor>> {
    return this.http.post<Autor>(`${API_URL}/autor/criarAutor`, body, {
      observe: 'response',
    });
  }

  validatorUniqueAutorName(autorName: string) {
    let MyParams = new HttpParams();
    MyParams = MyParams.append('nome', autorName);
    return this.http.get<any>(`${API_URL}/autor/validarNomeAutor`, {
      params: MyParams,
    });
  }

  findAuthorByName(authorName: String): Observable<HttpResponse<Autor>> {
    return this.http.get<Autor>(
      `${API_URL}/autor/visualizarUmAutor/${authorName}`,
      { observe: 'response' }
    );
  }
}
