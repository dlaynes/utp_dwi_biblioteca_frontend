import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Comentario } from '../../../domain/comentario';

@Component({
  selector: 'app-comentarios-detail-page',
  imports: [RouterLink],
  templateUrl: './comentarios-detail-page.html',
  styleUrl: './comentarios-detail-page.scss'
})
export class ComentariosDetailPage {

  comentario = signal<Comentario|null>(null);

  constructor(
    private router: Router
  ){

  }

  ngOnInit() {
    if (this.router.lastSuccessfulNavigation?.extras.state) {
      const receivedData = this.router.lastSuccessfulNavigation?.extras.state;
      console.log('Received data:', receivedData);

      this.comentario.set(receivedData as Comentario);
    }
  }

}
