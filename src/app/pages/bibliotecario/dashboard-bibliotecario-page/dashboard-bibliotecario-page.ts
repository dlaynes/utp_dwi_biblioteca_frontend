import { Component, effect, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard-bibliotecario-page',
  imports: [],
  templateUrl: './dashboard-bibliotecario-page.html',
  styleUrl: './dashboard-bibliotecario-page.scss',
  standalone: true,
})
export class DashboardBibliotecarioPage {

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
