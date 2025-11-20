import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../../domain/libro';
import { Observable } from 'rxjs';
import { PagedQuery, PagedResponse } from '../utils/paged-query';

// TODO: Usar el tipo correcto para las solicitures

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private base = BASE_URL + 'publico/libros';

  constructor(private http: HttpClient){
  }

  buscar(query: PagedQuery): Observable<PagedResponse<Libro[]>> {
    return this.http.get<PagedResponse<Libro[]>>(this.base + '/busqueda' + query.build());
  }

  lista(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.base);
  }

  listaBibliotecario(): Observable<Libro[]> {
    return this.http.get<Libro[]>(BASE_URL + 'bibliotecario/libros');
  }

  detalle(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.base}/${id}`);
  }

  deCategoria(slug: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.base}/categoria/${slug}`);
  }

  crear(data: Libro): Observable<Libro> {
    return this.http.post<Libro>(BASE_URL+'bibliotecario/libros', data);
  }

  actualizar(id: number, data: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${BASE_URL}bibliotecario/libros/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}bibliotecario/libros/${id}`);
  }
}
