import { Component, OnInit, signal } from '@angular/core';
import { LibrosService } from '../../../services/publico/libros-service';
import { Libro } from '../../../domain/libro';
import { Router } from '@angular/router';
import { Categoria } from '../../../domain/categoria';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-categoria-page',
  imports: [],
  templateUrl: './categoria-page.html',
  styleUrl: './categoria-page.scss',
  standalone: true,
})
export class CategoriaPage implements OnInit {

  categoria = signal<Categoria|null>(null);

  cargando = signal(true);

  libros = signal<Libro[]>([]);

  Math = Math;

  constructor(
    private libroService: LibrosService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.cargar();
  }

  private async cargar(): Promise<void> {
    let extrasData : Categoria|null = null;

    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);
      extrasData = receivedData as Categoria;
      this.categoria.set(extrasData);
    }
    // TODO: cargar la categoria si están haciendo refresh

    if(extrasData){
      const res = await lastValueFrom(this.libroService.deCategoria(extrasData.slug));
      console.log("Libros encontrados", res)
      this.libros.set(res);
    }
    this.cargando.set(false);
  }

  verDetalle(id: number){
    this.router.navigate(['/detalle-libro/', id], {state: this.libros().find(l => l.id === id)});
  }

}
