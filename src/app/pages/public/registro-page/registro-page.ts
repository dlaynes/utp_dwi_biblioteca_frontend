import { Component, OnInit, WritableSignal, signal} from '@angular/core';
import { Router, RouterLink } from "@angular/router";

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TIPOS_DOCUMENTO } from '../../../domain/tipo-documento';
import { GENEROS } from '../../../domain/genero';
import { ESTADOS_CIVILES } from '../../../domain/estado-civil';
import { mustMatch } from '../../../validators/must-match';
import { AuthService } from '../../../services/auth-service';
import { Usuario } from '../../../domain/usuario';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro-page.html',
  styleUrl: './registro-page.scss',
  standalone: true,
})
export class RegistroPage implements OnInit {
  
  errorMessage: WritableSignal<string|null> = signal(null);
  
  registerForm!: FormGroup;

  TIPOS_DOCUMENTO = TIPOS_DOCUMENTO;

  GENEROS = GENEROS;

  ESTADOS_CIVILES = ESTADOS_CIVILES;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', Validators.required],
    }, { validators: mustMatch('password', 'passwordConfirm') });
  }

  async onSubmit() {
    try {
      const res = await lastValueFrom(this.authService.register(this.registerForm.value as Usuario));
      if(res){
        alert("Su cuenta ha sido creada satisfactoriamente!");
        this.router.navigateByUrl('/login');
      }
    } catch(err: any){
      this.errorMessage.set(err?.message);
    }
  }
}
