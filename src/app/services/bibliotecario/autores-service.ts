import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../../domain/autor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private base = BASE_URL + '/bibliotecario/autores';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.base);
  }

  detalle(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.base}/${id}`);
  }

  crear(data: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.base, data);
  }

  actualizar(id: number, data: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.base}/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

}
