import { Component, effect, signal, WritableSignal } from '@angular/core';
import { UsuariosService } from '../../../services/admin/usuarios-service';
import { Usuario } from '../../../domain/usuario';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AuthState } from '../../../state/auth-state';
import { lastValueFrom } from 'rxjs';
import { GridActions } from '../../../components/grid-actions/grid-actions';

@Component({
  selector: 'app-usuarios-page',
  imports: [AgGridAngular],
  templateUrl: './usuarios-page.html',
  styleUrl: './usuarios-page.scss',
  standalone: true,
})
export class UsuariosPage {
  // Usamos un signal para mantener el estado de los usuarios.
  usuarios: WritableSignal<Usuario[]> = signal([]);

  // La definición de columnas no cambia.
  colDefs: ColDef[] = [
      { field: "nombres" },
      { field: "apellidos" },
      { field: "email" },
      { field: "ultimoLogin" },
      { field: "id", cellRenderer: GridActions, cellRendererParams: {
        editAction: this.edit.bind(this),
        deleteAction: this.delete.bind(this),
        suppressMouseEventHandling: () => true,
      }, headerName: "Acciones"}
  ];

  constructor(
    private authState: AuthState,
    private usuarioService: UsuariosService,
  ){
    effect(()=>{
      // El effect se ejecutará cuando el token cambie.
      const token = this.authState.token();
      if(!token) return;

      // Llamamos a un método asíncrono para cargar los datos.
      this.cargarUsuarios();
    });
  }

  edit(id: number){
    console.log("Editando usuario", id);
  }

  delete(id: number){
    console.log("Borrando usuario", id);
  }

  private async cargarUsuarios(): Promise<void> {
    const usuariosRes = await lastValueFrom(this.usuarioService.lista());
    this.usuarios.set(usuariosRes); // Actualizamos el signal. La vista se actualizará automáticamente.
  }
}
