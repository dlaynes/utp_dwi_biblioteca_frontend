import { Injectable, signal } from '@angular/core';
import { RolKey } from '../domain/rol';

const TOKEN_KEY = "biblioteca-token";

export const Grupos : Record<RolKey, string> = {
    ROLE_ADMIN: 'admin',
    ROLE_BIBLIOTECARIO: 'bibliotecario',
    ROLE_CLIENTE: 'cliente',
} as const;


@Injectable({
  providedIn: 'root'
})
export class AuthState {
  readonly token = signal<string|null>(null);

  readonly roles = signal<RolKey[]>([]);

  setToken(token: string){
    this.token.set(token);
  }

  resetToken(){
    this.token.set(null);
  }

  setRoles(roles: RolKey[]){
    this.roles.set(roles);
  }

  resetRoles(){
    this.roles.set([]);
  }

  esAdmin(){
    return this.roles().includes("ROLE_ADMIN");
  }

  esBibliotecario(){
    return this.roles().includes("ROLE_BIBLIOTECARIO");
  }

  esCliente(){
    return this.roles().includes("ROLE_CLIENTE");
  }

  getGroup(){
    if(this.esAdmin()){
      return Grupos.ROLE_ADMIN;
    }
    if(this.esBibliotecario()){
      return Grupos.ROLE_BIBLIOTECARIO;
    }
    if(this.esCliente()){
      return Grupos.ROLE_CLIENTE;
    }
    return null;
  }

}
