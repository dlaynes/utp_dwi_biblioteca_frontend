import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestarLibroFormPage } from './prestar-libro-form-page';

describe('PrestarLibroFormPage', () => {
  let component: PrestarLibroFormPage;
  let fixture: ComponentFixture<PrestarLibroFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestarLibroFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestarLibroFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
