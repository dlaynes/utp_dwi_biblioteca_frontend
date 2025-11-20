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
import { ESTADOS_USUARIO } from '../../../domain/estado-usuario';
import { ROLES } from '../../../domain/rol';
import { UsuariosService } from '../../../services/admin/usuarios-service';

@Component({
  selector: 'app-usuarios-detail-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './usuarios-detail-page.html',
  styleUrl: './usuarios-detail-page.scss',
  standalone: true,
})
export class UsuariosDetailPage implements OnInit {

  errorMessage: WritableSignal<string|null> = signal(null);

  usuario = signal<Usuario|null>(null);
  
  userForm!: FormGroup;

  TIPOS_DOCUMENTO = TIPOS_DOCUMENTO;

  GENEROS = GENEROS;

  ESTADOS_CIVILES = ESTADOS_CIVILES;

  ESTADOS_USUARIO = ESTADOS_USUARIO;

  ROLES = ROLES;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuariosService,
    private router: Router,
  ) {

  }

  ngOnInit() {

    let userData : Usuario|null = null;

    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);
      userData = receivedData as Usuario;
      this.usuario.set(userData);
    }

    const currentRoles = userData?.rolKeys || [];
    const userBooleans = ROLES.map((rol) => currentRoles.includes(rol.value)) || [];


    // TODO: obtener el usuario si hay un id, y no se han recuperado datos

    this.userForm = this.fb.group({
      nombres: [userData?.nombres || '', Validators.required],
      apellidos: [userData?.apellidos || '', Validators.required],
      email: [userData?.email || '', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(0)],
      passwordConfirm: ['', Validators.minLength(0)],
      tipoDocumento: [userData?.tipoDocumento || '', Validators.required],
      numeroDocumento: [userData?.numeroDocumento || '', Validators.required],
      estadoCivil: [userData?.estadoCivil || '', Validators.required],
      genero: [userData?.genero || '', Validators.required],
      telefono: [userData?.telefono || '', Validators.required],
      estadoUsuario: [userData?.estadoUsuario || 'normal', Validators.required],
      rolKeys: this.fb.array(userBooleans)
    }, { validators: mustMatch('password', 'passwordConfirm') });
  }

  async onSubmit() {
    console.log(this.userForm.value);

    if(this.userForm?.invalid){
      return;
    }
    this.sendForm();
  }

  async sendForm(){
    try { 
      const user = this.usuario();
      const form = {...this.userForm?.value};

      const rolKeys : string[] = [];
      ROLES.forEach( (rol, idx) => {
        if(form.rolKeys[idx]){
          rolKeys.push(rol.value);
        }
      });
      form.rolKeys = rolKeys;

      if(!user){
        const res = await lastValueFrom(this.usuarioService.crear(form as Usuario));
        alert("El usuario ha sido creado!");
        this.router.navigateByUrl('/admin/usuarios');
      } else {
        const res = await lastValueFrom(this.usuarioService.actualizar(user.id,form as Usuario));    
        alert("El usuario ha sido actualizado!");
      } 
    } catch(e){
      console.log("Hubo un error al guardar el usuario", e);
    }
  }


}
