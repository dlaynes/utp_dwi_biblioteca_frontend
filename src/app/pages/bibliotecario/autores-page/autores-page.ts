import { Component, effect, signal, WritableSignal } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AuthState } from '../../../state/auth-state';
import { lastValueFrom } from 'rxjs';
import { GridActions } from '../../../components/grid-actions/grid-actions';
import { Router, RouterLink } from '@angular/router';
import { Autor } from '../../../domain/autor';
import { AutoresService } from '../../../services/bibliotecario/autores-service';

@Component({
  selector: 'app-autores-page',
  imports: [RouterLink, AgGridAngular],
  templateUrl: './autores-page.html',
  styleUrl: './autores-page.scss',
  standalone: true,
})
export class AutoresPage {

  autores: WritableSignal<Autor[]> = signal([]);

  colDefs: ColDef[] = [
      { field: "nombres", filter: true },
      { field: "apellidos" , width: 140, filter: true},
      { field: "nacionalidad", width: 140, filter: true },
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
    private autoresService: AutoresService,
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
    this.router.navigate(['/bibliotecario/autores/', id], {state: this.autores().find(l => l.id === id)});
  }

  delete(id: number){
    console.log("Borrando autor", id);
  }

  private async cargar(): Promise<void> {
    const res = await lastValueFrom(this.autoresService.lista());
    this.autores.set(res);
  }
}
