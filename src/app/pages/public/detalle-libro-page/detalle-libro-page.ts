import { Component, effect, OnInit, signal } from '@angular/core';
import { Usuario } from '../../../domain/usuario';
import { Libro } from '../../../domain/libro';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../state/auth-state';
import { GENEROS_LITERARIOS } from '../../../domain/genero-literario';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LUGARES_PRESTAMO } from '../../../domain/lugar-prestamo';
import { LibrosService } from '../../../services/publico/libros-service';

@Component({
  selector: 'app-detalle-libro-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './detalle-libro-page.html',
  styleUrl: './detalle-libro-page.scss'
})
export class DetalleLibroPage implements OnInit {

  usuario = signal<Usuario|null>(null);

  libro = signal<Libro|null>(null);

  path = signal('');

  cargando = signal(true);

  generoLiterario = signal<typeof GENEROS_LITERARIOS[number]|null>(null);

  form!: FormGroup;

  LUGARES_PRESTAMO = LUGARES_PRESTAMO;

  constructor(
    private router: Router,
    private authState: AuthState,
    private libroService: LibrosService,
    private prestamosService: PrestamosService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ){
    effect(()=>{
      const usuario = this.authState.user();
      this.usuario.set(usuario);
    });

    effect(()=>{
      const path = this.path(); 
      if(path){
        this.cargarLibro(parseInt(path));
      }
    });
  }

  ngOnInit(): void {  
    this.route.url.subscribe(segments => {
      this.path.set(segments[1].path);
    });

    this.form = this.fb.group({
      lugarPrestamo: ['salon', Validators.required],
    });
  }

  private async cargarLibro(id: number): Promise<void> {
    if(id){
      try {
        const res = await lastValueFrom(this.libroService.detalle(id));
        this.libro.set(res);
        this.cargando.set(false);

        const genero = GENEROS_LITERARIOS.find(g => g.value === res?.generoLiterario);
        this.generoLiterario.set(genero || null);

      } catch(e){
        console.log("Hubo un error al leer el préstamo", e)
      }
    }
  }

  async reservar(){
    const lib = this.libro();
    if(!lib?.id) return;
    const form = {...this.form?.value};

    try {
      const res = await lastValueFrom(this.prestamosService.misPrestamosReservar({
        lugarPrestamo: form.lugarPrestamo,
        libroId: lib.id
      }));
      if(res){
        alert("Solicitud de reserva enviada con éxito!");
        this.router.navigateByUrl('/cliente/mis-reservas');
      }

    } catch (e){
      console.log(e);
    }
  }
}
