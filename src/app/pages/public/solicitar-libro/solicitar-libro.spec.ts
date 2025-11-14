import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarLibro } from './solicitar-libro';

describe('SolicitarLibro', () => {
  let component: SolicitarLibro;
  let fixture: ComponentFixture<SolicitarLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarLibro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
