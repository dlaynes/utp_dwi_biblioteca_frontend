import { Component, effect, OnInit, signal, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';
import { AdminDashboardResponse, DashboardService } from '../../../services/admin/dashboard-service';
import { PrestamosService } from '../../../services/cliente/prestamos-service';
import { PagedQuery } from '../../../services/utils/paged-query';
import { Prestamo } from '../../../domain/prestamo';
import { EstadoPrestamo, ESTADOS_PRESTAMO } from '../../../domain/estado-prestamo';
import { LUGARES_PRESTAMO, LugarPrestamo } from '../../../domain/lugar-prestamo';
import { ColDef } from 'ag-grid-community';
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
  selector: 'app-dashboard-admin-page',
  imports: [AgGridAngular],
  templateUrl: './dashboard-admin-page.html',
  styleUrl: './dashboard-admin-page.scss',
  standalone: true,
})
export class DashboardAdminPage implements OnInit {

  stats = signal<AdminDashboardResponse|null>(null);

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
