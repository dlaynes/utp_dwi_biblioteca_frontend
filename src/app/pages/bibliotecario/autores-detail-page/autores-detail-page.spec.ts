import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresDetailPage } from './autores-detail-page';

describe('AutoresDetailPage', () => {
  let component: AutoresDetailPage;
  let fixture: ComponentFixture<AutoresDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoresDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoresDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
