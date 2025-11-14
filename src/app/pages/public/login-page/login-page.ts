import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../state/auth-state';
import { FormsModule, NgForm } from '@angular/forms';
import { PerfilService } from '../../../services/cliente/perfil-service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  standalone: true,
})
export class LoginPage {

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private perfilService: PerfilService,
    private router: Router
  ){

  }

  onSubmit(ngForm: NgForm){
    if(ngForm.valid){
      const values = ngForm.form.value;
      this.authService.login(values.email, values.password, true)
        .subscribe(res =>{
          const self = this;
          if(res.token){
            self.authState.setToken(res.token);
          }
          if(res.roles){
            self.authState.setRoles(res.roles);

            if(self.authState.esAdmin(res.roles)){
              self.router.navigateByUrl('/admin');
            } else if(self.authState.esBibliotecario(res.roles)){
              self.router.navigateByUrl('/bibliotecario');
            } else if(self.authState.esCliente(res.roles)){
              self.router.navigateByUrl('/mis-reservas');
            }
          }
          setTimeout(()=>{
            if(res.token){
              self.perfilService.misDatos().subscribe(res=>{
                console.log("Usuario", res);
              })
            }
          },300);
        });
    }
  }
}

