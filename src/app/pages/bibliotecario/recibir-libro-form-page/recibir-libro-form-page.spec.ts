import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirLibroFormPage } from './recibir-libro-form-page';

describe('RecibirLibroFormPage', () => {
  let component: RecibirLibroFormPage;
  let fixture: ComponentFixture<RecibirLibroFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecibirLibroFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecibirLibroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
