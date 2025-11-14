import { Injectable } from '@angular/core';
import { BASE_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../domain/libro';
import { Observable } from 'rxjs';
import { BibliotecaQuery } from './types';
import { formatParams } from './functions';

export type LibroRequest = {

};

@Injectable({
  providedIn: 'root'
})
export class Libros {

  constructor(
    private http: HttpClient,
  ){
    
  }

  list(params?: BibliotecaQuery): Observable<Libro[]> {
    return this.http.get<Libro[]>(BASE_URL + "/publico/libros" + formatParams(params));
  }

  byCategory(categoryName: string, params?: BibliotecaQuery){
    return this.http.get<Libro[]>(BASE_URL + "/publico/libros/categoria/" + categoryName + formatParams(params));
  }

  add(libro: LibroRequest){
    return this.http.post<Libro>(BASE_URL + "/bibliotecario/libros", libro);
  }

  edit(libroId: number, libro: LibroRequest){
    return this.http.put<Libro>(BASE_URL + "/bibliotecario/libros/" + libroId, libro);
  }

  delete(libroId: number){
    return this.http.delete<Libro>(BASE_URL + "/bibliotecario/libros/" + libroId);  
  }

}
