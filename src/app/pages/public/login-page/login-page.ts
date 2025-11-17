import { Component, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../state/auth-state';
import { FormsModule, NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: true,
})
export class LoginPage {
    // Usamos un signal para el mensaje de error.
  errorMessage: WritableSignal<string|null> = signal(null);

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private router: Router
  ){
  }

  async onSubmit(ngForm: NgForm){
    if(!ngForm.valid){
      return;
    }

    const values = ngForm.form.value;
    try {
      const res = await lastValueFrom(this.authService.login(values.email, values.password, true));

      const self = this;
      if(res.token){
        self.authState.setToken(res.token);
      }
      if(res.roles){
        self.authState.setRoles(res.roles);
        // TODO: notificación de ingreso
        if(self.authState.esAdmin(res.roles)){
          self.router.navigateByUrl('/admin');
        } else if(self.authState.esBibliotecario(res.roles)){
          self.router.navigateByUrl('/bibliotecario');
        } else if(self.authState.esCliente(res.roles)){
          self.router.navigateByUrl('/cliente/mis-reservas');
        }
      }

    } catch(err: any){
      this.errorMessage.set(err?.message);
    }
  }
}

