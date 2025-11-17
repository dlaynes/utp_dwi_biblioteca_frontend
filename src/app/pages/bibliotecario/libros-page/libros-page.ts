import { Component, signal, WritableSignal, effect } from '@angular/core';
import { Libro } from '../../../domain/libro';
import { AuthState } from '../../../state/auth-state';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { LibrosService } from '../../../services/publico/libros-service';
import { lastValueFrom } from 'rxjs';
import { GridActions } from '../../../components/grid-actions/grid-actions';

@Component({
  selector: 'app-libros-page',
  imports: [AgGridAngular],
  templateUrl: './libros-page.html',
  styleUrl: './libros-page.scss',
  standalone: true,
})
export class LibrosPage {

  libros: WritableSignal<Libro[]> = signal([]);

  colDefs: ColDef[] = [
      { field: "titulo", width: 120 },
      { field: "autor", width: 120, valueFormatter: params => params.value?.nombres + ' ' + params.value?.apellidos},
      { field: "editorial", valueFormatter: params => params.value?.nombre},
      { field: "publicadoEn", headerName: "Fecha de publicación" },
      { field: "id", width: 240, cellRenderer: GridActions, cellRendererParams: {
        actions: [
          {type: 'edit', btnClass: 'btn-primary', label: 'Editar', action: this.edit.bind(this)},
          {type: 'inventory', btnClass: 'btn-info', label: 'Inventario', action: this.verInventario.bind(this)},
          {type: 'delete', btnClass: 'btn-danger', label: 'Eliminar', action: this.delete.bind(this)},
        ],
        suppressMouseEventHandling: () => true,
      }, headerName: "Acciones"}
  ];

  constructor(
    private authState: AuthState,
    private libroService: LibrosService,
  ){
    effect(()=>{
      const token = this.authState.token();
      if(!token) return;

      this.cargarLibros();
    });
  }

  edit(id: number){
    console.log("Editando libro", id);
  }

  delete(id: number){
    console.log("Borrando libro", id);
  }

  verInventario(id: number){
    console.log("Ver nventario de libro", id);
  }

  private async cargarLibros(): Promise<void> {
    const res = await lastValueFrom(this.libroService.lista());
    this.libros.set(res); // Actualizamos el signal. La vista se actualizará automáticamente.
  }
}

