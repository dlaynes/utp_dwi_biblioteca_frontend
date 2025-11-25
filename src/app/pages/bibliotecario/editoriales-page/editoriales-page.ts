import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
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
export class EditorialesPage implements OnInit {

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
    private editorialService: EditorialesService,
  ){
  }

  ngOnInit(): void {
    this.cargar();
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
