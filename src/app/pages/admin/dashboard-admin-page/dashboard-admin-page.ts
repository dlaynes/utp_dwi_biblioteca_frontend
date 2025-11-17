import { Component, effect, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard-admin-page',
  imports: [],
  templateUrl: './dashboard-admin-page.html',
  styleUrl: './dashboard-admin-page.scss',
  standalone: true,
})
export class DashboardAdminPage {
  constructor(
    private authState: AuthState,
    private perfilService: PerfilService, 

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
}
