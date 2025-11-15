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

  constructor(){
    const token = sessionStorage.getItem('biblioteca_token');
    const roles = sessionStorage.getItem('biblioteca_roles');
    const user = sessionStorage.getItem('biblioteca_user');
    if(token && roles && user){
      this.user.set(JSON.parse(user));
      this.roles.set(JSON.parse(roles));
      this.token.set(token);
    }
  }

  setUsuario(usuario: Usuario){
    this.user.set(usuario);
    sessionStorage.setItem('biblioteca_user', JSON.stringify(usuario));
  }

  setToken(token: string){
    this.token.set(token);
    sessionStorage.setItem('biblioteca_token', token);
  }

  logout(){
    this.resetToken();
    this.resetRoles();
    this.resetUsuario();
  }

  resetToken(){
    this.token.set(null);
    sessionStorage.removeItem('biblioteca_token');
  }

  setRoles(roles: RolKey[]){
    this.roles.set(roles);
    sessionStorage.setItem('biblioteca_user', JSON.stringify(roles));
  }

  resetRoles(){
    this.roles.set([]);
    sessionStorage.removeItem('biblioteca_roles');
  }

  resetUsuario(){
    this.user.set(null);
    sessionStorage.removeItem('biblioteca_user');
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
