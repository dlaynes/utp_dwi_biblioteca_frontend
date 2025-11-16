import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReservasPage } from './mis-reservas-page';

describe('MisReservasPage', () => {
  let component: MisReservasPage;
  let fixture: ComponentFixture<MisReservasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisReservasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisReservasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
