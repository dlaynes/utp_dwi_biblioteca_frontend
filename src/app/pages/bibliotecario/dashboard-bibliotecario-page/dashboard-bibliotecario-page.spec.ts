import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBibliotecarioPage } from './dashboard-bibliotecario-page';

describe('DashboardBibliotecarioPage', () => {
  let component: DashboardBibliotecarioPage;
  let fixture: ComponentFixture<DashboardBibliotecarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBibliotecarioPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBibliotecarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
