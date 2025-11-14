import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriasService } from '../../../services/publico/categorias-service';
import { EventosService } from '../../../services/publico/eventos-service';

@Component({
  selector: 'app-index-page',
  imports: [RouterLink],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
  standalone: true
})
export class IndexPage implements OnInit {

  constructor(
    private categoriaService: CategoriasService,
    private eventosService: EventosService
  ){

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


}
