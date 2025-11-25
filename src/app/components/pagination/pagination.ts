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
  pages: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['itemsPerPage'] || changes['currentPage']) {
      this.calculatePages();
    }
  }

  private calculatePages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = this.getSlidingWindow();
  }

  private getSlidingWindow(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // Cuántas páginas mostrar a los lados de la actual
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined; // Puntero para el último número agregado

    // 1. Generamos el rango de números deseados
    for (let i = 1; i <= total; i++) {
      // Condición: Siempre mostrar la primera (1), la última (total), 
      // y las que estén dentro del rango (current - delta a current + delta)
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    // 2. Insertamos los puntos suspensivos donde haya saltos
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          // Si hay un hueco de exactamente un número (ej: 1, 3), ponemos el número faltante (2)
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          // Si el hueco es grande (ej: 1, ... 5), ponemos '...'
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  selectPage(page: number | string): void {
    // Ignorar si es '...' o si ya estamos en esa página
    if (typeof page === 'string' || page === this.currentPage) return;

    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
