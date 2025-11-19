import { Component, effect, signal } from '@angular/core';
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

  esAdmin = signal(false);

  esBibliotecario =signal(false);

  esCliente = signal(false);

  usuario = signal<Usuario|null>(null);

  path: string = '';

  constructor(
    private router: Router,
    location: Location,
    private authState: AuthState){

    this.router.events.subscribe((val) => {
      this.path = location.path();
    });

    effect(()=>{
      this.usuario.set(this.authState.user());
    })

    effect(()=>{
      const roles = this.authState.roles();
      this.esAdmin.set(this.authState.esAdmin(roles));
      this.esBibliotecario.set(this.authState.esBibliotecario(roles));
      this.esCliente.set(this.authState.esCliente(roles));
    });

  }

  logout(){
    this.authState.logout();
  }
}
