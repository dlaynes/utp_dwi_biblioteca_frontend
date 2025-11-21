import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosDetailPage } from './comentarios-detail-page';

describe('ComentariosDetailPage', () => {
  let component: ComentariosDetailPage;
  let fixture: ComponentFixture<ComentariosDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariosDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
