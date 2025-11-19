import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialesDetailPage } from './editoriales-detail-page';

describe('EditorialesDetailPage', () => {
  let component: EditorialesDetailPage;
  let fixture: ComponentFixture<EditorialesDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorialesDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorialesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
