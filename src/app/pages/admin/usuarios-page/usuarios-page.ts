import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/admin/usuarios-service';
import { Usuario } from '../../../domain/usuario';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AuthState } from '../../../state/auth-state';

@Component({
  selector: 'app-usuarios-page',
  imports: [AgGridAngular],
  templateUrl: './usuarios-page.html',
  styleUrl: './usuarios-page.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosPage {
  usuarios: Usuario[] = [];

  colDefs: ColDef[] = [
      { field: "id" },
      { field: "nombres" },
      { field: "apellidos" },
      { field: "email" },
      { field: "ultimoLogin" }
  ];
  
  constructor(
    private authState: AuthState,
    private usuarioService: UsuariosService,
    private changeDetector: ChangeDetectorRef,
  ){
    effect(()=>{
      const token = this.authState.token();
      if(!token) return;
      const self = this;

      setTimeout(()=>{
        self.usuarioService.lista().subscribe(res=>{
          self.usuarios = res;
          self.changeDetector.detectChanges();
        });
      }, 300);
    });
  }

}
