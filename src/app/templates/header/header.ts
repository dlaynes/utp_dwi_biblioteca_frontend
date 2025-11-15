import { Component, effect } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../state/auth-state';
import { Usuario } from '../../domain/usuario';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {

  esAdmin = false;

  esBibliotecario = false;

  esCliente = false;

  usuario : Usuario|null = null;

  path: string = '';

  constructor(
    private router: Router,
    location: Location,
    private authState: AuthState){

    this.router.events.subscribe((val) => {
      this.path = location.path();
    });

    effect(()=>{
      this.usuario = this.authState.user();
    })

    effect(()=>{
      const roles = this.authState.roles();
      this.esAdmin = this.authState.esAdmin(roles);
      this.esBibliotecario = this.authState.esBibliotecario(roles);
      this.esCliente = this.authState.esCliente(roles);
    });

  }

  logout(){
    this.authState.logout();
  }
}
