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
    return this.http.post<Evento>(this.base, data);
  }

  actualizar(id: number, data: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.base}/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
