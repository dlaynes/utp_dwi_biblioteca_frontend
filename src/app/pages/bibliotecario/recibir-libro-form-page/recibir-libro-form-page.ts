import { Component, effect, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LUGARES_PRESTAMO } from '../../../domain/lugar-prestamo';
import { Prestamo } from '../../../domain/prestamo';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { AuthState } from '../../../state/auth-state';

@Component({
  selector: 'app-recibir-libro-form-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recibir-libro-form-page.html',
  styleUrl: './recibir-libro-form-page.scss'
})
export class RecibirLibroFormPage {
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

      this.prestamo.set(receivedData);
      this.cargando.set(false);
    }
    this.route.url.subscribe(segments => {
      this.path.set(segments[2].path);
    });
    this.form = this.fb.group({
      observacionesRetorno: [''],
      advertencia: new FormControl(false)
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

  async recibirPrestamo(){
    try {
      const id = this.prestamo()?.id || 0;
      const form = {...this.form?.value};
      const res = await lastValueFrom(this.prestamosService.recibirPrestamo(id, form));
      if(res){
        alert("El libro fue devuelto correctamente!");
        this.router.navigateByUrl('/bibliotecario/prestamos/'+id);
      } 
    } catch(e){
      console.log("Error al recibir el préstamo", e);
    }
  }

}
