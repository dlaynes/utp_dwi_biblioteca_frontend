import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPage implements OnInit {

  cargandoCategorias = true;

  cargandoEventos = true;

  categorias: Categoria[] = [];

  eventos: Evento[] = [];

  tiposEvento: Record<string,string> = {};

  Date = Date;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private categoriaService: CategoriasService,
    private eventosService: EventosService
  ){
    TIPOS_EVENTO.forEach(it => {
      this.tiposEvento[it.value] = it.label;
    });
  }

  ngOnInit(): void {
    const self = this;
    self.categoriaService.lista().subscribe(res => {
      self.categorias = res;
      self.cargandoCategorias = false;
      self.changeDetector.detectChanges(); // Parche para hacer que se actualize la plantilla en localhost
    });
    self.eventosService.lista().subscribe(res => {
      self.eventos = res;
      self.cargandoEventos = false;
      self.changeDetector.detectChanges();
    });

  }
}
