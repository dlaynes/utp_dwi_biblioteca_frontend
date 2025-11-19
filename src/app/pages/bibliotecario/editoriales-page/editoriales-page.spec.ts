import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialesPage } from './editoriales-page';

describe('EditorialesPage', () => {
  let component: EditorialesPage;
  let fixture: ComponentFixture<EditorialesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorialesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorialesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
