import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDetailPage } from './usuarios-detail-page';

describe('UsuariosDetailPage', () => {
  let component: UsuariosDetailPage;
  let fixture: ComponentFixture<UsuariosDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
