import { Component, effect, OnInit, signal } from '@angular/core';
import { Usuario } from '../../../domain/usuario';
import { Libro } from '../../../domain/libro';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../state/auth-state';
import { GENEROS_LITERARIOS } from '../../../domain/genero-literario';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LUGARES_PRESTAMO } from '../../../domain/lugar-prestamo';

@Component({
  selector: 'app-detalle-libro-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './detalle-libro-page.html',
  styleUrl: './detalle-libro-page.scss'
})
export class DetalleLibroPage implements OnInit {

  usuario = signal<Usuario|null>(null);

  libro = signal<Libro|null>(null);

  generoLiterario = signal<typeof GENEROS_LITERARIOS[number]|null>(null);

  form!: FormGroup;

  LUGARES_PRESTAMO = LUGARES_PRESTAMO;

  constructor(
    private router: Router,
    private authState: AuthState,
    private prestamosService: PrestamosService,
    private fb: FormBuilder,
  ){
    effect(()=>{
      const usuario = this.authState.user();
      this.usuario.set(usuario);
    });
  }

  ngOnInit(): void {  

    this.form = this.fb.group({
      lugarPrestamo: ['salon', Validators.required],
    });

    this.cargar();
  }

  private async cargar(): Promise<void> {
    let extrasData : Libro|null = null;

    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);
      extrasData = receivedData as Libro;
      this.libro.set(extrasData);

      const genero = GENEROS_LITERARIOS.find(g => g.value === extrasData?.generoLiterario);
      this.generoLiterario.set(genero || null);
    }
  }

  async reservar(){
    const lib = this.libro();
    if(!lib?.id) return;
    const form = {...this.form?.value};

    const res = await lastValueFrom(this.prestamosService.misPrestamosReservar({
      lugarPrestamo: form.lugarPrestamo,
      libroId: lib.id
    }));

  }
}
