import { Component, effect, OnInit, signal, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { Prestamo } from '../../../domain/prestamo';
import { EstadoPrestamo, ESTADOS_PRESTAMO } from '../../../domain/estado-prestamo';
import { RouterLink } from '@angular/router';
import { LUGARES_PRESTAMO, LugarPrestamo } from '../../../domain/lugar-prestamo';

const estadosPrestamo : Partial<Record<EstadoPrestamo, string>> = {};
const lugaresPrestamo : Partial<Record<LugarPrestamo, string>> = {};

ESTADOS_PRESTAMO.forEach(it => {
  estadosPrestamo[it.value] = it.label;
});
LUGARES_PRESTAMO.forEach(it => {
  lugaresPrestamo[it.value] = it.label;
});

@Component({
  selector: 'app-mis-reservas-page',
  imports: [RouterLink],
  templateUrl: './mis-reservas-page.html',
  styleUrl: './mis-reservas-page.scss',
  standalone: true,
})
export class MisReservasPage implements OnInit {

  prestamos = signal<Prestamo[]>([]);

  cargando = signal(true);

  estadosPrestamo = estadosPrestamo;

  lugaresPrestamo = lugaresPrestamo;

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
      // Debido a que es una página de entrada al momento de iniciar sesión, se deben contemplar todos los casos
      untracked(async ()=>{
        try {
          const res = await lastValueFrom(this.perfilService.misDatos());
          if(res?.id) {
            this.authState.setUsuario(res);
            this.cargarPrestamos();
          }
        } catch(e: any){
          console.log(e?.message);
        }
      });
    });
  }

  ngOnInit(): void {
    if(this.authState.token()){
      this.cargarPrestamos();
    }
  }
  
  async cargarPrestamos(){
    this.cargando.set(true);
    const prestamos = await lastValueFrom(this.prestamosService.misPrestamos());
    this.prestamos.set(prestamos);
    this.cargando.set(false);
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
