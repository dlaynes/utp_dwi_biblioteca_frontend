import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../domain/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private base = BASE_URL + '/publico/libros';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.base);
  }

  detalle(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.base}/${id}`);
  }

  crear(data: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.base, data);
  }

  actualizar(id: number, data: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.base}/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
