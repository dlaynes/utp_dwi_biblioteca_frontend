import { Component, effect, signal } from '@angular/core';
import { Prestamo } from '../../../domain/prestamo';
import { AuthState } from '../../../state/auth-state';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { LUGARES_PRESTAMO } from '../../../domain/lugar-prestamo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-prestar-libro-form-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './prestar-libro-form-page.html',
  styleUrl: './prestar-libro-form-page.scss'
})
export class PrestarLibroFormPage {

  errorMessage = signal('');

  cargando = signal(true);

  prestamo = signal<Prestamo|null>(null);

  path = signal('');

  form!: FormGroup;

  LUGARES_PRESTAMO = LUGARES_PRESTAMO;

  constructor(
    private authState: AuthState,
    private prestamosService: PrestamosService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ){
    effect(()=>{
      const path = this.path();
      const prestamo = this.prestamo();

      if(path && !prestamo){
        this.cargarPrestamo();
      }
    });
  }

  ngOnInit() {
    let receivedData : Prestamo|null = null;
    if (this.router.lastSuccessfulNavigation?.extras.state) {
      receivedData = this.router.lastSuccessfulNavigation?.extras.state as Prestamo;
      console.log('Received data:', receivedData);

      this.prestamo.set(receivedData);
      this.cargando.set(false);
    }
    this.route.url.subscribe(segments => {
      this.path.set(segments[2].path);
    });
    this.form = this.fb.group({
      observacionesEntrega: [''],
      lugarPrestamo: [receivedData?.lugarPrestamo ||'salon', Validators.required],
    });

  }

  async cargarPrestamo(){
    const id = parseInt(this.path());
    if(id){
      try {
        const res = await lastValueFrom(this.prestamosService.detalle(id));
        this.prestamo.set(res);
        this.cargando.set(false);
      } catch(e){
        console.log("Hubo un error al leer el préstamo", e)
      }
    }
  }

  async aceptarPrestamo(){
    try {
      const id = this.prestamo()?.id || 0;
      const form = {...this.form?.value};
      const res = await lastValueFrom(this.prestamosService.aceptarPrestamo(id, form));
      if(res){
        alert("El préstamo fue aceptado!");
        this.router.navigateByUrl('/bibliotecario/prestamos/'+id);
      } 
    } catch(e){
      console.log("Error al aceptar el préstamo", e);
    }
  }


}
