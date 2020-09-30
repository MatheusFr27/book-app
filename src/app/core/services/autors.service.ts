import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from './../models/autor.model';
import { API_URL } from './../api';

@Injectable({
  providedIn: 'root',
})
export class AutorsService {
  constructor(private http: HttpClient) {}

  findAllAutors(): Observable<HttpResponse<Autor[]>> {
    return this.http.get<Autor[]>(`${API_URL}/autor/visualizarTodosAutores`, {
      observe: 'response',
    });
  }

  createNewAutor(body: Autor): Observable<HttpResponse<Autor>> {
    return this.http.post<Autor>(`${API_URL}/autor/criarAutor`, body, {
      observe: 'response',
    });
  }
}
