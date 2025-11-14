import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private base = BASE_URL + 'cliente/perfil';

  constructor(private http: HttpClient){
  }

  misDatos() : Observable<Usuario>{
    return this.http.get<Usuario>(this.base);
  }

}
