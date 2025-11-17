import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../../domain/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private base = BASE_URL + 'publico/categorias';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.base);
  }

  detalle(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.base}/${id}`);
  }

  crear(data: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${BASE_URL}/bibliotecario/categorias`, data);
  }

  actualizar(id: number, data: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${BASE_URL}/bibliotecario/categorias/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/bibliotecario/categorias/${id}`);
  }
}
