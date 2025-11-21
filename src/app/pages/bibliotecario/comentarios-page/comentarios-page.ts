import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GridActions } from '../../../components/grid-actions/grid-actions';
import { Comentario } from '../../../domain/comentario';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ComentariosService } from '../../../services/publico/comentarios-service';

@Component({
  selector: 'app-comentarios-page',
  imports: [AgGridAngular],
  templateUrl: './comentarios-page.html',
  styleUrl: './comentarios-page.scss'
})
export class ComentariosPage implements OnInit {

  comentarios: WritableSignal<Comentario[]> = signal([]);

  colDefs: ColDef[] = [
    { field: "nombre", filter: true },
    { field: "correo" , width: 140, filter: true},
    { field: "celular", width: 140, filter: true },
    { field: "id", cellRenderer: GridActions, cellRendererParams: {
      actions: [
        {type: 'view', btnClass: 'btn-light', label: 'Ver', action: this.ver.bind(this)},
        {type: 'delete', btnClass: 'btn-danger', label: 'Eliminar', action: this.delete.bind(this)},
      ],
      suppressMouseEventHandling: () => true,
    }, headerName: "Acciones"}
  ];

  constructor(
    private router: Router,
    private comentariosService: ComentariosService,
  ){
  }
  
  ngOnInit(): void {
    this.cargar();
  }
  
  ver(id: number){
    this.router.navigate(['/bibliotecario/comentarios/', id], {state: this.comentarios().find(l => l.id === id)});
  }

  delete(id: number){
    console.log("Borrando comentario", id);
  }

  private async cargar(): Promise<void> {
    const res = await lastValueFrom(this.comentariosService.lista());
    this.comentarios.set(res);
  }
}
