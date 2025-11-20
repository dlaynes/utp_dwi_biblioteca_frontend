import { Component, OnInit, signal } from '@angular/core';
import { PagedQuery } from '../../../services/utils/paged-query';
import { lastValueFrom } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LibrosService } from '../../../services/publico/libros-service';
import { Libro } from '../../../domain/libro';
import { EstadoBusqueda } from '../../../services/utils/types';

@Component({
  selector: 'app-colecciones-page',
  imports: [RouterLink],
  templateUrl: './colecciones-page.html',
  styleUrl: './colecciones-page.scss'
})
export class ColeccionesPage implements OnInit {

  libros = signal<Libro[]>([]);

  cargando = signal<EstadoBusqueda>('inactivo');

  totalItems = signal(0);

  constructor(
    private librosService: LibrosService,
    private router: Router,
  ){

  }
  ngOnInit(): void {
    this.cargar();
  }

  async cargar(){

    this.cargando.set('cargando');
    const query = new PagedQuery(
      0,
      10,
      'id',
      'desc'
    );

    try {
      const res = await lastValueFrom(this.librosService.buscar(query));
      this.cargando.set('resultados');
      this.libros.set(res.results);
      this.totalItems.set(res.totalItems);
    } catch(e){
      console.log("Error búsqueda", e)
    }
  }
  
}
