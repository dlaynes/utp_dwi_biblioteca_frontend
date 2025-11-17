import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { InventarioLibro } from '../../domain/inventario-libro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioLibroService {
  private base = BASE_URL + 'publico/inventarios';

  constructor(private http: HttpClient){
  }

  lista(): Observable<InventarioLibro[]> {
    return this.http.get<InventarioLibro[]>(this.base);
  }

  detalle(id: number): Observable<InventarioLibro> {
    return this.http.get<InventarioLibro>(`${this.base}/${id}`);
  }

  crear(data: InventarioLibro): Observable<InventarioLibro> {
    return this.http.post<InventarioLibro>(`${BASE_URL}/bibliotecario/inventarios`, data);
  }

  actualizar(id: number, data: InventarioLibro): Observable<InventarioLibro> {
    return this.http.put<InventarioLibro>(`${BASE_URL}/bibliotecario/inventarios/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/bibliotecario/inventarios/${id}`);
  }
}
