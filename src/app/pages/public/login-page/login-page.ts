import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthState } from '../../../state/auth-state';
import { FormsModule, NgForm } from '@angular/forms';

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
    private authState: AuthState
  ){

  }

  onSubmit(ngForm: NgForm){
    if(ngForm.valid){
      const values = ngForm.form.value;
      this.authService.login(values.email, values.password, true)
        .subscribe(res =>{
          console.log("Server response", res);
          if(res.token){
            this.authState.setToken(res.token);
          }
          if(res.roles){
            this.authState.setRoles(res.roles);
          }
        });
    }
  }
}

