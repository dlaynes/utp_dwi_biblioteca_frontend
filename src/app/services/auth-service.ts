import { Injectable } from '@angular/core';
import { BASE_URL } from './config';
import { HttpClient } from '@angular/common/http';
import type { LoginResponse } from './auth-service.types';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private base = BASE_URL + 'auth';

  constructor(private http: HttpClient){
  }

  public login (email: string, password: string, remember = false) {
    return this.http.post<LoginResponse>(this.base + '/login', {
      email,
      password,
      remember
    });
  }

  public register(usuario: Usuario){
    return this.http.post<Usuario>(this.base+'/register', usuario);
  }

}
