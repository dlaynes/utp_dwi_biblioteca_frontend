import { Component, effect, signal, Signal, WritableSignal } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AuthState } from '../../../state/auth-state';
import { lastValueFrom } from 'rxjs';
import { GridActions } from '../../../components/grid-actions/grid-actions';
import { Router, RouterLink } from '@angular/router';
import { Editorial } from '../../../domain/editorial';
import { EditorialesService } from '../../../services/bibliotecario/editoriales-service';

@Component({
  selector: 'app-editoriales-page',
  imports: [RouterLink, AgGridAngular],
  templateUrl: './editoriales-page.html',
  styleUrl: './editoriales-page.scss',
  standalone: true
})
export class EditorialesPage {

  editoriales: WritableSignal<Editorial[]> = signal([]);

  colDefs: ColDef[] = [
      { field: "nombre", filter: true },
      { field: "ciudad" , width: 140, filter: true},
      { field: "pais", width: 140, filter: true },
      { field: "id", cellRenderer: GridActions, cellRendererParams: {
        actions: [
          {type: 'edit', btnClass: 'btn-primary', label: 'Editar', action: this.edit.bind(this)},
          {type: 'delete', btnClass: 'btn-danger', label: 'Eliminar', action: this.delete.bind(this)},
        ],
        suppressMouseEventHandling: () => true,
      }, headerName: "Acciones"}
  ];

  constructor(
    private router: Router,
    private authState: AuthState,
    private editorialService: EditorialesService,
  ){
    effect(()=>{
      // El effect se ejecutará cuando el token cambie.
      const token = this.authState.token();
      if(!token) return;

      // Llamamos a un método asíncrono para cargar los datos.
      this.cargar();
    });
  }

  edit(id: number){
    this.router.navigate(['/bibliotecario/editoriales/', id], {state: this.editoriales().find(l => l.id === id)});
  }

  delete(id: number){
    console.log("Borrando editorial", id);
  }

  private async cargar(): Promise<void> {
    const res = await lastValueFrom(this.editorialService.lista());
    this.editoriales.set(res); // Actualizamos el signal. La vista se actualizará automáticamente.
  }

}
