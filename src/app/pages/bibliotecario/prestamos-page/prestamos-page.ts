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
      { field: "estadoPrestamo", width: 130, valueFormatter: params => params.value?.estadoPrestamo},
      { field: "lugarPrestamo", width: 130, valueFormatter: params => params.value?.lugarPrestamo},
      { field: "fechaReserva", width: 130},
      { field: "fechaPrestamo", width: 130},
      { field: "fechaRetorno", width: 130},
      { field: "advertencia", width: 120},
      { field: "id", width: 240, cellRenderer: GridActions, cellRendererParams: {
        actions: [
          {type: 'edit', btnClass: 'btn-primary', label: 'Editar', action: this.edit.bind(this)},
          {type: 'cancelar', btnClass: 'btn-warning', label: 'Editar', action: this.cancelarReserva.bind(this), checkRender: (data: Prestamo)=>{
            return data.estadoPrestamo === 'reservado';
          }},
          {type: 'delete', btnClass: 'btn-danger', label: 'Eliminar', action: this.delete.bind(this)},
        ],
        suppressMouseEventHandling: () => true,
      }, headerName: "Acciones"}
  ];

  constructor(
    private router: Router,
    private authState: AuthState,
    private prestamosService: PrestamosService
  ){

  }
  ngOnInit(): void {
    this.cargarPrestamos();
  }

  async cargarPrestamos(){
    const prestamos = await lastValueFrom(this.prestamosService.lista());
    this.prestamos.set(prestamos);
    this.cargando.set(false);
  }

  cancelarReserva(id: number){
    try {

    } catch(e){

    }
  }
    
  edit(id: number){
    this.router.navigate(['/bibliotecario/prestamos', id], {state: this.prestamos().find(l => l.id === id)});
  }

  delete(id: number){
    console.log("Borrando préstamo", id);
  }

}
