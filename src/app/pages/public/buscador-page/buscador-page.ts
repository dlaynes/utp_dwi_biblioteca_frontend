import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../../../services/publico/categorias-service';
import { LibrosService } from '../../../services/publico/libros-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Libro } from '../../../domain/libro';
import { Categoria } from '../../../domain/categoria';
import { lastValueFrom } from 'rxjs';
import { PagedQuery } from '../../../services/utils/paged-query';
import { Pagination } from '../../../components/pagination/pagination';
import { EstadoBusqueda } from '../../../services/utils/types';

@Component({
  selector: 'app-buscador-page',
  imports: [RouterLink, ReactiveFormsModule, Pagination],
  templateUrl: './buscador-page.html',
  styleUrl: './buscador-page.scss'
})
export class BuscadorPage implements OnInit {

  cargando = signal<EstadoBusqueda>('inactivo');

  libros = signal<Libro[]>([]);

  page = signal(1);

  size = signal(10);

  sortColumn = signal('id');

  sortDirection = signal<'asc' | 'desc'>('asc');

  totalItems = signal(0);

  categorias = signal<Categoria[]>([]);

  form!: FormGroup;

  constructor(
    private librosService: LibrosService,
    private categoriasService: CategoriasService,
    private router: Router,
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [''],
    });
  }

  async buscar(page = this.page()){
    const v = this.form.value;

    this.cargando.set('cargando');
    const query = new PagedQuery(
      page - 1,
      this.size(),
      this.sortColumn(),
      this.sortDirection(),
      {
        titulo: v.titulo
      }
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

  cambiarPagina(pagina: number){
    this.page.set(pagina);
    this.buscar(pagina);
  }

}
