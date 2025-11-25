import { Component, effect, OnInit, signal, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';
import { BibliotecarioDashboardResponse, DashboardService } from '../../../services/bibliotecario/dashboard-service';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { EstadoPrestamo, ESTADOS_PRESTAMO } from '../../../domain/estado-prestamo';
import { LugarPrestamo, LUGARES_PRESTAMO } from '../../../domain/lugar-prestamo';
import { ColDef } from 'ag-grid-community';
import { Prestamo } from '../../../domain/prestamo';
import { PagedQuery } from '../../../services/utils/paged-query';
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
  selector: 'app-dashboard-bibliotecario-page',
  imports: [AgGridAngular],
  templateUrl: './dashboard-bibliotecario-page.html',
  styleUrl: './dashboard-bibliotecario-page.scss',
  standalone: true,
})
export class DashboardBibliotecarioPage implements OnInit {

  stats = signal<BibliotecarioDashboardResponse|null>(null);

  cargando = signal(true);

  prestamos = signal<Prestamo[]>([]);

  estadosPrestamo = estadosPrestamo;

  lugaresPrestamo = lugaresPrestamo;

  colDefs: ColDef[] = [
      { field: "estadoPrestamo", width: 110, headerName: 'Estado', valueFormatter: params => params.value?.estadoPrestamo},
      { field: "cliente", width: 130, valueFormatter: params => params.data?.cliente?.nombres + ' ' + params.data?.cliente?.apellidos},
      { field: "lugarPrestamo", width: 130, valueFormatter: params => params.value?.lugarPrestamo},
      { field: "fechaReserva", width: 130},
      { field: "fechaPrestamo", width: 130},
      { field: "fechaRetorno", width: 130},
      { field: "advertencia", headerName: "Alerta?", width: 80},
  ];
  
  constructor(
    private authState: AuthState,
    private perfilService: PerfilService, 
    private dashboardService: DashboardService,
    private prestamosService: PrestamosService,
  ){
    effect(()=>{
      const token = this.authState.token();
      if(!token){
        return;
      }
      untracked(async ()=>{
        try {
          const res = await lastValueFrom(this.perfilService.misDatos());

          if(res?.id) {
            this.authState.setUsuario(res);
            this.cargarDashboard();
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
      this.cargarDashboard();
      this.cargarPrestamos();
    }
  }

  async cargarPrestamos(){
    const query = new PagedQuery(
      0,
      10,
      'id',
      'desc'
    );
    try {
      const res = await lastValueFrom(this.prestamosService.buscar(query));
      this.prestamos.set(res.results);
    } catch(e){
      console.log("Error búsqueda", e)
    }

  }

  async cargarDashboard(){
    this.cargando.set(true);
    const res = await lastValueFrom(this.dashboardService.list());
    this.stats.set(res);
    this.cargando.set(false);
  }

}
