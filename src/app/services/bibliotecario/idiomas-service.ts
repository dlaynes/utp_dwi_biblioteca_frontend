import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Idioma } from '../../domain/idioma';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {
  private base = BASE_URL + 'publico/idiomas';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(this.base);
  }

  detalle(id: number): Observable<Idioma> {
    return this.http.get<Idioma>(`${this.base}/${id}`);
  }

  crear(data: Idioma): Observable<Idioma> {
    return this.http.post<Idioma>(`${BASE_URL}bibliotecario/idiomas`, data);
  }

  actualizar(id: number, data: Idioma): Observable<Idioma> {
    return this.http.put<Idioma>(`${BASE_URL}bibliotecario/idiomas/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}bibliotecario/idiomas/${id}`);
  }
}
