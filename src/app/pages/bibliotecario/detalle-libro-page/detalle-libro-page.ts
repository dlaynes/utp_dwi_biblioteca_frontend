import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../state/auth-state';
import { LibrosService } from '../../../services/publico/libros-service';
import { AutoresService } from '../../../services/bibliotecario/autores-service';
import { EditorialesService } from '../../../services/bibliotecario/editoriales-service';
import { IdiomasService } from '../../../services/bibliotecario/idiomas-service';
import { Libro } from '../../../domain/libro';
import { lastValueFrom } from 'rxjs';
import { Autor } from '../../../domain/autor';
import { Editorial } from '../../../domain/editorial';
import { Idioma } from '../../../domain/idioma';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { GENEROS_LITERARIOS } from '../../../domain/genero-literario';
import { Categoria } from '../../../domain/categoria';
import { CategoriasService } from '../../../services/publico/categorias-service';

@Component({
  selector: 'app-detalle-libro-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './detalle-libro-page.html',
  styleUrl: './detalle-libro-page.scss'
})
export class DetalleLibroPage implements OnInit{

  GENEROS_LITERARIOS = GENEROS_LITERARIOS;

  private router = inject(Router);

  isLoading = signal(true);

  libro = signal<Libro|null>(null);

  autores = signal<Autor[]>([]);

  editoriales = signal<Editorial[]>([]);

  categorias = signal<Categoria[]>([]);

  idiomas = signal<Idioma[]>([]);

  detalleLibroForm: FormGroup<any>|null = null;

  constructor(
    private authState: AuthState,
    private libroService: LibrosService,
    private categoriaService: CategoriasService,
    private fb: FormBuilder,
    private autorService: AutoresService,
    private editorialService: EditorialesService,
    private idiomaService: IdiomasService,
  ){

  }

  ngOnInit() {
    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);

      this.libro.set(receivedData as Libro);
    }
    // TODO: si no hay libro y existe un id, cargarlo
    this.obtenerRecursos();
  }

  async obtenerRecursos(){
    const autores = lastValueFrom(this.autorService.lista());
    const editoriales = lastValueFrom(this.editorialService.lista());
    const idiomas = lastValueFrom(this.idiomaService.lista());
    const categorias = lastValueFrom(this.categoriaService.lista());

    try {
      const [autoresRes, editorialesRes, idiomasRes, categoriaRes] = await Promise.all([autores, editoriales, idiomas, categorias]);

      this.autores.set(autoresRes);
      this.editoriales.set(editorialesRes); 
      this.idiomas.set(idiomasRes);
      this.categorias.update(() => categoriaRes);

      const lib = this.libro();

      const currentCatIds = lib?.categoriaIds || [];
      const catBooleans = categoriaRes?.map((categoria: Categoria) => currentCatIds.includes(categoria.id)) || [];

      this.detalleLibroForm = this.fb.group({
        titulo: [lib?.titulo || ''],
        autorId: [lib?.autor?.id || ''],
        editorialId: [lib?.editorial?.id || ''],
        idiomaId: [lib?.idioma?.id || ''],
        publicadoEn: [lib?.publicadoEn || ''],
        ibsm: [lib?.ibsm || ''],
        nacionalidad: [lib?.nacionalidad || ''],
        paginas: [lib?.paginas || ''],
        generoLiterario: [lib?.generoLiterario || ''],
        disponibles: [lib?.disponibles || 0],
        reservados: [lib?.reservados || 0, {disabled: true}],
        perdidos: [lib?.perdidos || 0, {disabled: true}],
        prestados: [lib?.prestados || 0, {disabled: true}],
        categoriaIds: this.fb.array(catBooleans)
      });

    } catch(e){
      console.log(e);
    }
    this.isLoading.set(false);

  }

  submit(){
    if(this.detalleLibroForm?.invalid){
      return;
    }
    this.sendForm();
  }

  async sendForm(){
    try {
      const libro = this.libro();
      const categorias = this.categorias();

      const form = {...this.detalleLibroForm?.value};

      // Convertimos los checkboxes en ids de categoría
      const catIds : number[] = [];
      categorias.forEach( (categoria, idx) => {
        if(form.categoriaIds[idx]){
          catIds.push(categoria.id);
        }
      });
      form.categoriaIds = catIds;

      if(!libro){
        const res = await lastValueFrom(this.libroService.crear(form as Libro));
        alert("El libro ha sido creado!");
      } else {
        const res = await lastValueFrom(this.libroService.actualizar(libro.id, form as Libro));
        alert("El libro ha sido actualizado!");
      }
    } catch(e){
      console.log("Hubo un error al guardar el libro", e);
    }

  }

}
