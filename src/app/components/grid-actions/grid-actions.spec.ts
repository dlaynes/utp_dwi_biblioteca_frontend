import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridActions } from './grid-actions';

describe('GridActions', () => {
  let component: GridActions;
  let fixture: ComponentFixture<GridActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
