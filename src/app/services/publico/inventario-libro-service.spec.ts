import { TestBed } from '@angular/core/testing';

import { InventarioLibroService } from './inventario-libro-service';

describe('InventarioLibroService', () => {
  let service: InventarioLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
