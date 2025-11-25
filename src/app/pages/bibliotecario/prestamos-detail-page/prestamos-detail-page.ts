import { Component, effect, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { AuthState } from '../../../state/auth-state';
import { Prestamo } from '../../../domain/prestamo';

@Component({
  selector: 'app-prestamos-detail-page',
  imports: [RouterLink],
  templateUrl: './prestamos-detail-page.html',
  styleUrl: './prestamos-detail-page.scss'
})
export class PrestamosDetailPage {

  prestamo = signal<Prestamo|null>(null);

  path = signal('');

  cargando = signal(true);

  constructor(
    private prestamosService: PrestamosService,
    private router: Router,
    private route: ActivatedRoute
  ){
    effect(()=>{
      const path = this.path(); 
      if(path){
        this.cargarPrestamo(parseInt(path));
      }
    });
  }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.path.set(segments[2].path);
    });
  }

  async cargarPrestamo(id: number){
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

  async cancelarReserva(id: number){
    if(!confirm('¿Está seguro de querer cancelar la reserva?')){
      return;
    }
    try {
      const res = await lastValueFrom(this.prestamosService.cancelarPrestamo(id));
      if(res){
        alert("Reserva cancelada");
        
      }
    } catch(e){
      console.log(e);
    }
  }

  async marcarPerdido(id: number){
    if(!confirm('¿Está seguro de querer marcar el préstamo como perdido?')){
      return;
    }
    try {
      const res = await lastValueFrom(this.prestamosService.marcarPerdido(id));
      if(res){
        alert("Préstamo marcado como perdido");
        this.cargarPrestamo(id);
      }
    } catch(e){
      console.log(e);
    }
  }

  prestarLibro(id: number){
    this.router.navigate(['/bibliotecario/prestar-libro/', id], {state: this.prestamo() || {}});
  }

  recibirLibro(id: number){
    this.router.navigate(['/bibliotecario/recibir-libro/', id], {state: this.prestamo() || {}});
  }
    


}
