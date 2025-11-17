import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { Evento } from '../../domain/evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
    private base = BASE_URL + 'publico/eventos';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.base);
  }

  detalle(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.base}/${id}`);
  }

  crear(data: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${BASE_URL}/bibliotecario/eventos`, data);
  }

  actualizar(id: number, data: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${BASE_URL}/bibliotecario/eventos/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/bibliotecario/eventos/${id}`);
  }
}
