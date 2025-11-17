import { Component, effect, untracked } from '@angular/core';
import { AuthState } from '../../../state/auth-state';
import { PerfilService } from '../../../services/cliente/perfil-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-mis-reservas-page',
  imports: [],
  templateUrl: './mis-reservas-page.html',
  styleUrl: './mis-reservas-page.scss',
  standalone: true,
})
export class MisReservasPage {
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
