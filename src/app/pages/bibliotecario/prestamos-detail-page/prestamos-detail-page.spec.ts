import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosDetailPage } from './prestamos-detail-page';

describe('PrestamosDetailPage', () => {
  let component: PrestamosDetailPage;
  let fixture: ComponentFixture<PrestamosDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamosDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
