import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  imports: [],
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
  standalone: true,
})
export class Categoria {
  constructor(private route: ActivatedRoute){
    this.route.params.subscribe( params => {
      console.log("Params Categoría", params);
    });
  }
}
