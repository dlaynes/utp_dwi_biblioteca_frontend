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

  idiomas = signal<Idioma[]>([]);

  detalleLibroForm: FormGroup<any>|null = null;

  constructor(
    private authState: AuthState,
    private libroService: LibrosService,
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
      // You can now use receivedData in your component
      this.libro.set(receivedData as Libro);
    }
    // TODO: si no hay libro y existe un id, cargarlo
    this.obtenerRecursos();
  }

  async obtenerRecursos(){
    const autores = lastValueFrom(this.autorService.lista());
    const editoriales = lastValueFrom(this.editorialService.lista());
    const idiomas = lastValueFrom(this.idiomaService.lista());
    try {
      const [autoresRes, editorialesRes, idiomasRes] = await Promise.all([autores, editoriales, idiomas]);
      console.log(autoresRes, editorialesRes, idiomasRes);

      this.autores.set(autoresRes);
      this.editoriales.set(editorialesRes); 
      this.idiomas.set(idiomasRes);

      const lib = this.libro();

      this.detalleLibroForm = this.fb.group({
        titulo: [lib?.titulo || ''],
        autor: [lib?.autor?.id || ''],
        editorial: [lib?.editorial?.id || ''],
        idioma: [lib?.idioma?.id || ''],
        publicadoEn: [lib?.publicadoEn || ''],
        ibsm: [lib?.ibsm || ''],
        nacionalidad: [lib?.nacionalidad || ''],
        paginas: [lib?.paginas || ''],
        generoLiterario: [lib?.generoLiterario || ''],
      });

    } catch(e){
      console.log(e);
    }
    this.isLoading.set(false);

  }

  submit(){
    console.log(this.detalleLibroForm?.value);
  }

}
