import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosPage } from './comentarios-page';

describe('ComentariosPage', () => {
  let component: ComentariosPage;
  let fixture: ComponentFixture<ComentariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
