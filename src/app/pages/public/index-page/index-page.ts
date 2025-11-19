import { Component, OnInit, WritableSignal, signal} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../../../services/publico/categorias-service';
import { EventosService } from '../../../services/publico/eventos-service';
import { Categoria } from '../../../domain/categoria';
import { Evento } from '../../../domain/evento';
import { TIPOS_EVENTO } from '../../../domain/tipo-evento';
import { DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-index-page',
  imports: [DatePipe],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
  standalone: true,
})
export class IndexPage implements OnInit {

  cargandoCategorias: WritableSignal<boolean> = signal(true);

  cargandoEventos: WritableSignal<boolean> = signal(true);

  categorias: WritableSignal<Categoria[]> = signal([]);

  eventos: WritableSignal<Evento[]> = signal([]);

  tiposEvento: Record<string,string> = {};

  Date = Date;

  constructor(
    private categoriaService: CategoriasService,
    private eventosService: EventosService,
    private router: Router,
  ){
    TIPOS_EVENTO.forEach(it => {
      this.tiposEvento[it.value] = it.label;
    });
  }

  private async cargarCategorias () {
    const res = await lastValueFrom(this.categoriaService.lista());
    this.categorias.set(res);
    this.cargandoCategorias.set(false);
  }

  private async cargarEventos(){
    const res = await lastValueFrom(this.eventosService.lista());
    this.eventos.set(res);
    this.cargandoEventos.set(false);
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarEventos();
  }

  navegarACategoria(slug: string){
    this.router.navigate(['/categoria/', slug], {state: this.categorias().find(l => l.slug === slug)});
  }
}
