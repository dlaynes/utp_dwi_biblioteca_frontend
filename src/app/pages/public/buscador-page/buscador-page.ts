import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../../../services/publico/categorias-service';
import { LibrosService } from '../../../services/publico/libros-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Libro } from '../../../domain/libro';
import { Categoria } from '../../../domain/categoria';
import { lastValueFrom } from 'rxjs';
import { PagedQuery } from '../../../services/utils/paged-query';

@Component({
  selector: 'app-buscador-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './buscador-page.html',
  styleUrl: './buscador-page.scss'
})
export class BuscadorPage implements OnInit {

  cargando = signal(false);

  libros = signal<Libro[]>([]);

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
      pagina: [1],
      size: [10],
      sortColumn: ['id'],
      sortDirection: ['asc']
    });
  }

  async buscar(){
    const v = this.form.value;

    this.cargando.set(true);
    const query = new PagedQuery(
      v.pagina - 1,
      v.size,
      v.sortColumn,
      v.sortDirection.toLowerCase() as 'asc' | 'desc',
      {
        titulo: v.titulo
      }
    );

    try {
      const res = await lastValueFrom(this.librosService.buscar(query));
      this.cargando.set(false);
      this.libros.set(res.results);
    } catch(e){
      console.log("Error búsqueda", e)
    }
  }

}
