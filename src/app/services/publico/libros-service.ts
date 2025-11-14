import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../../domain/libro';
import { Observable } from 'rxjs';

// TODO: Usar el tipo correcto para las solicitures

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private base = BASE_URL + 'publico/libros';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.base);
  }

  detalle(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.base}/${id}`);
  }

  crear(data: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.base, data);
  }

  actualizar(id: number, data: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.base}/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
