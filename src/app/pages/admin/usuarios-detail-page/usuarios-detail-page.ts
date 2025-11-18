import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TIPOS_DOCUMENTO } from '../../../domain/tipo-documento';
import { GENEROS } from '../../../domain/genero';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ESTADOS_CIVILES } from '../../../domain/estado-civil';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { mustMatch } from '../../../validators/must-match';
import { Usuario } from '../../../domain/usuario';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-usuarios-detail-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './usuarios-detail-page.html',
  styleUrl: './usuarios-detail-page.scss',
  standalone: true,
})
export class UsuariosDetailPage implements OnInit {

  errorMessage: WritableSignal<string|null> = signal(null);
  
  userForm!: FormGroup;

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

    let userData : Usuario|null = null;

    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);
      userData = receivedData as Usuario;
    }
    // TODO: obtener el usuario si hay un id, y no se han recuperado datos

    this.userForm = this.fb.group({
      nombres: [userData?.nombres || '', Validators.required],
      apellidos: [userData?.apellidos || '', Validators.required],
      email: [userData?.email || '', [Validators.required, Validators.email]],
      password: [''],
      passwordConfirm: [''],
      tipoDocumento: [userData?.tipoDocumento || '', Validators.required],
      numeroDocumento: [userData?.numeroDocumento || '', Validators.required],
      estadoCivil: [userData?.estadoCivil || '', Validators.required],
      genero: [userData?.genero || '', Validators.required],
      telefono: [userData?.telefono || '', Validators.required],
    }, { validators: mustMatch('password', 'passwordConfirm') });
  }

  async onSubmit() {
    console.log(this.userForm.value);
    /*
    try {
      const res = await lastValueFrom(this.authService.register(this.userForm.value as Usuario));
      if(res){
        alert("Su cuenta ha sido creada satisfactoriamente!");
        this.router.navigateByUrl('/login');
      }
    } catch(err: any){
      this.errorMessage.set(err?.message);
    }
    */
  }


}
