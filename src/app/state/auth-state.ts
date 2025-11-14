import { Injectable, signal } from '@angular/core';
import { RolKey } from '../domain/rol';
import { Usuario } from '../domain/usuario';

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

  readonly user = signal<Usuario|null>(null);

  setUsuario(usuario: Usuario){
    this.user.set(usuario);
  }

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

  resetUsuario(){
    this.user.set(null);
  }

  esAdmin(roles=this.roles()){
    return roles.includes("ROLE_ADMIN");
  }

  esBibliotecario(roles=this.roles()){
    return roles.includes("ROLE_BIBLIOTECARIO");
  }

  esCliente(roles=this.roles()){
    return roles.includes("ROLE_CLIENTE");
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
