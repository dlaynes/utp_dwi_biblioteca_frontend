import { Component, effect, signal, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { Prestamo } from '../../../domain/prestamo';
import { EstadoPrestamo, ESTADOS_PRESTAMO } from '../../../domain/estado-prestamo';
import { RouterLink } from '@angular/router';

const estadosPrestamo : Partial<Record<EstadoPrestamo, string>> = {};

ESTADOS_PRESTAMO.forEach(it => {
  estadosPrestamo[it.value] = it.label;
});

@Component({
  selector: 'app-mis-reservas-page',
  imports: [RouterLink],
  templateUrl: './mis-reservas-page.html',
  styleUrl: './mis-reservas-page.scss',
  standalone: true,
})
export class MisReservasPage {

  prestamos = signal<Prestamo[]>([]);

  cargando = signal(true);

  estadosPrestamo = estadosPrestamo;

  constructor(
    private authState: AuthState,
    private perfilService: PerfilService, 
    private prestamosService: PrestamosService
  ){

    effect(()=>{
      const token = this.authState.token();
      if(!token){
        return;
      }
      untracked(async ()=>{
        try {
          const res = await lastValueFrom(this.perfilService.misDatos());
          await this.cargarPrestamos();
          this.cargando.set(false);
          if(res?.id) {
            this.authState.setUsuario(res);
          }

        } catch(e: any){
          console.log(e?.message);
        }
      });
    });
  }

  async cargarPrestamos(){
    const prestamos = await lastValueFrom(this.prestamosService.misPrestamos());
    this.prestamos.set(prestamos);
  }

  async cancelarReserva(id: number){
    if(!confirm('¿Está seguro de querer cancelar la reserva?')){
      return;
    }
    try {
      const res = await lastValueFrom(this.prestamosService.misPrestamosCancelarReserva(id));
      if(res){
        alert("Reserva cancelada");
        await this.cargarPrestamos();
      }
    } catch(e){
      console.log(e);
    }
    
  }

}
