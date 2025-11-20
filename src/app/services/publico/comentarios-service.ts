import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { Comentario } from '../../domain/comentario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient){
  }

  crear(data: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(BASE_URL+'publico/comentarios', data);
  }
  
  lista(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(BASE_URL+'publico/comentarios');
  }

  detalle(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${BASE_URL}/publico/comentarios/${id}`);
  }

}
