import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Editorial } from '../../domain/editorial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorialesService {
  private base = BASE_URL + 'bibliotecario/editoriales';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(this.base);
  }

  detalle(id: number): Observable<Editorial> {
    return this.http.get<Editorial>(`${this.base}/${id}`);
  }

  crear(data: Editorial): Observable<Editorial> {
    return this.http.post<Editorial>(this.base, data);
  }

  actualizar(id: number, data: Editorial): Observable<Editorial> {
    return this.http.put<Editorial>(`${this.base}/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
