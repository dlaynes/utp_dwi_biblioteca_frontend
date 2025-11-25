import { Component, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EstadoPrestamo, ESTADOS_PRESTAMO } from '../../../domain/estado-prestamo';
import { LugarPrestamo, LUGARES_PRESTAMO } from '../../../domain/lugar-prestamo';
import { Prestamo } from '../../../domain/prestamo';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { AuthState } from '../../../state/auth-state';
import { ColDef } from 'ag-grid-community';
import { GridActions } from '../../../components/grid-actions/grid-actions';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';

const estadosPrestamo : Partial<Record<EstadoPrestamo, string>> = {};
const lugaresPrestamo : Partial<Record<LugarPrestamo, string>> = {};

ESTADOS_PRESTAMO.forEach(it => {
  estadosPrestamo[it.value] = it.label;
});
LUGARES_PRESTAMO.forEach(it => {
  lugaresPrestamo[it.value] = it.label;
});

@Component({
  selector: 'app-prestamos-page',
  imports: [AgGridAngular],
  templateUrl: './prestamos-page.html',
  styleUrl: './prestamos-page.scss'
})
export class PrestamosPage implements OnInit {

  prestamos = signal<Prestamo[]>([]);

  cargando = signal(true);

  estadosPrestamo = estadosPrestamo;

  lugaresPrestamo = lugaresPrestamo;

  colDefs: ColDef[] = [
      { field: "estadoPrestamo", width: 110, headerName: 'Estado', valueFormatter: params => params.value?.estadoPrestamo},
      { field: "cliente", width: 130, valueFormatter: params => params.data?.cliente?.nombres + ' ' + params.data?.cliente?.apellidos},
      { field: "lugarPrestamo", width: 130, valueFormatter: params => params.value?.lugarPrestamo},
      { field: "fechaReserva", width: 120},
      { field: "fechaPrestamo", width: 120},
      { field: "fechaRetorno", width: 120},
      { field: "advertencia", headerName: "Alerta?", width: 80},
      { field: "id", width: 230, cellRenderer: GridActions, cellRendererParams: {
        actions: [
          {type: 'view', btnClass: 'btn-light', label: 'Ver', action: this.verDetalle.bind(this)},
          {type: 'prestar', btnClass: 'btn-info', label: 'Prestar', action: this.prestarLibro.bind(this), checkRender: (data: Prestamo)=>{
            return data.estadoPrestamo === 'reservado';
          }},
          {type: 'cancelar', btnClass: 'btn-warning', label: 'Cancelar', action: this.cancelarReserva.bind(this), checkRender: (data: Prestamo)=>{
            return data.estadoPrestamo === 'reservado';
          }},
          {type: 'recibir', btnClass: 'btn-success', label: 'Recibir', action: this.recibirLibro.bind(this), checkRender: (data: Prestamo)=>{
            return data.estadoPrestamo === 'prestado';
          }},
          {type: 'perdido', btnClass: 'btn-dark', label: 'Perdido', action: this.marcarPerdido.bind(this), checkRender: (data: Prestamo)=>{
            return data.estadoPrestamo === 'prestado';
          }},
        ],
        suppressMouseEventHandling: () => true,
      }, headerName: "Acciones"}
  ];

  constructor(
    private router: Router,
    private prestamosService: PrestamosService
  ){

  }
  ngOnInit(): void {
    this.cargarPrestamos();
  }

  async cargarPrestamos(){
    try {
      const prestamos = await lastValueFrom(this.prestamosService.lista());
      this.prestamos.set(prestamos);
      this.cargando.set(false);
    } catch(e){
      console.log("Hubo un error al listar los préstamos", e)
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
        await this.cargarPrestamos();
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
        await this.cargarPrestamos();
      }
    } catch(e){
      console.log(e);
    }
  }

  prestarLibro(id: number){
    this.router.navigate(['/bibliotecario/prestar-libro/', id], {state: this.prestamos().find(l => l.id === id)});
  }

  recibirLibro(id: number){
    this.router.navigate(['/bibliotecario/recibir-libro/', id], {state: this.prestamos().find(l => l.id === id)});
  }
    
  verDetalle(id: number){
    this.router.navigate(['/bibliotecario/prestamos', id], {state: this.prestamos().find(l => l.id === id)});
  }

}
