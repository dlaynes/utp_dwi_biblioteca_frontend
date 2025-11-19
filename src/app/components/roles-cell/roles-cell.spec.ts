import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesCell } from './roles-cell';

describe('RolesCell', () => {
  let component: RolesCell;
  let fixture: ComponentFixture<RolesCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
