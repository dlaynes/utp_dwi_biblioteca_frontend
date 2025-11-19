import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresPage } from './autores-page';

describe('AutoresPage', () => {
  let component: AutoresPage;
  let fixture: ComponentFixture<AutoresPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoresPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
