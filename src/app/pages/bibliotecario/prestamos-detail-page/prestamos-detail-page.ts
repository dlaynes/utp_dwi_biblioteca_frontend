import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(
    private authState: AuthState,
    private prestamosService: PrestamosService,
    private router: Router
  ){

  }

  ngOnInit() {
    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);

      this.prestamo.set(receivedData as Prestamo);
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
