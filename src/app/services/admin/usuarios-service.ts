import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../domain/usuario';
import { BASE_URL } from '../config';

export type ActualizarUsuarioRequest = {
  nombres: string;
  apellidos: string;
  email: string;
  password?: string;
  roles: ('ADMIN' | 'BIBLIOTECARIO' | 'CLIENTE')[];
  emailPersonal: string;
  tipoDocumento: string;
  numeroDocumento: string;
  genero: string;
  estadoCivil: string;
  estadoUsuario: string;
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private base = BASE_URL + '/admin/usuarios';

  constructor(private http: HttpClient){
  }

  lista(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.base);
  }

  detalle(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.base}/${id}`);
  }

  suspender(id: number): Observable<any> {
    return this.http.put<any>(`${this.base}/suspender/${id}`, {});
  }

  existeEmail(params: {id?: number, email: string}): Observable<boolean> {
    return this.http.post<any>(`${this.base}/existe`, params);
  }

  crear(data: ActualizarUsuarioRequest): Observable<Usuario|string> {
    return this.http.post<Usuario|string>(this.base, data);
  }

  actualizar(id: number, data: ActualizarUsuarioRequest): Observable<Usuario|string> {
    return this.http.put<Usuario|string>(`${this.base}/${id}`, data);
  }

  borrar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

}
