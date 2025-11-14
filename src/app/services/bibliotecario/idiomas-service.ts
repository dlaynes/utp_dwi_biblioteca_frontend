import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Idioma } from '../../domain/idioma';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {
  private base = BASE_URL + 'bibliotecario/editoriales';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(this.base);
  }

  detalle(id: number): Observable<Idioma> {
    return this.http.get<Idioma>(`${this.base}/${id}`);
  }

  crear(data: Idioma): Observable<Idioma> {
    return this.http.post<Idioma>(this.base, data);
  }

  actualizar(id: number, data: Idioma): Observable<Idioma> {
    return this.http.put<Idioma>(`${this.base}/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
