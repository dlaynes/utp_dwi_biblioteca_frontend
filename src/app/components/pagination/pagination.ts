import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

// Gemini 3
@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  standalone: true
})
export class Pagination implements OnChanges {
// --- Inputs (Datos recibidos del padre) ---
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;

  // --- Output (Evento hacia el padre) ---
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  // --- Propiedades internas ---
  totalPages: number = 0;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Recalcular páginas si cambian los inputs clave
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.calculatePages();
    }
  }

  private calculatePages(): void {
    // Fórmula: Total de páginas = Redondeo hacia arriba (Total Items / Items por página)
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
    // Generamos un array simple [1, 2, 3...] para iterar en el HTML
    // Nota: Para listas muy grandes, aquí implementarías una lógica de "ventana" (ej. 1... 5 6 7 ... 20)
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  selectPage(page: number): void {
    // Validación para no ir más allá de los límites
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
