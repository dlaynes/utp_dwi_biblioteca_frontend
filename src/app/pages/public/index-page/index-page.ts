import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriasService } from '../../../services/publico/categorias-service';
import { EventosService } from '../../../services/publico/eventos-service';
import { Categoria } from '../../../domain/categoria';
import { Evento } from '../../../domain/evento';
import { TIPOS_EVENTO } from '../../../domain/tipo-evento';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-index-page',
  imports: [RouterLink, DatePipe],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
  standalone: true
})
export class IndexPage implements OnInit {

  cargandoCategorias = true;

  cargandoEventos = true;

  categorias: Categoria[] = [];

  eventos: Evento[] = [];

  tiposEvento: Record<string,string> = {};

  Date = Date;

  constructor(
    private categoriaService: CategoriasService,
    private eventosService: EventosService
  ){
    TIPOS_EVENTO.forEach(it => {
      this.tiposEvento[it.value] = it.label;
    });
  }

  ngOnInit(): void {
    this.categoriaService.lista().subscribe(res => {
      console.log("Categorias", res);
      this.categorias = res;
      this.cargandoCategorias = false;
    });
    this.eventosService.lista().subscribe(res => {
      console.log("Eventos", res);
      this.eventos = res;
      this.cargandoEventos = false;
    });
  }


}
