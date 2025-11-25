import { Component, effect, OnInit, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';
import { DashboardService } from '../../../services/bibliotecario/dashboard-service';
import { PrestamosService } from '../../../services/cliente/prestamos-service';

@Component({
  selector: 'app-dashboard-bibliotecario-page',
  imports: [],
  templateUrl: './dashboard-bibliotecario-page.html',
  styleUrl: './dashboard-bibliotecario-page.scss',
  standalone: true,
})
export class DashboardBibliotecarioPage implements OnInit {

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
    }
  }

  async cargarDashboard(){

  }

}
