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
      { field: "titulo" },
      { field: "autor", valueFormatter: params => params.value?.nombres + ' ' + params.value?.apellidos},
      { field: "editorial", valueFormatter: params => params.value?.nombre},
      { field: "publicadoEn", headerName: "Fecha de publicación" },
      { field: "id", cellRenderer: GridActions, cellRendererParams: {
        editAction: this.edit.bind(this),
        deleteAction: this.delete.bind(this),
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

  private async cargarLibros(): Promise<void> {
    const res = await lastValueFrom(this.libroService.lista());
    this.libros.set(res); // Actualizamos el signal. La vista se actualizará automáticamente.
  }
}

