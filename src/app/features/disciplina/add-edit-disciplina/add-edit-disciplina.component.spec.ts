import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDisciplinaComponent } from './add-edit-disciplina.component';

describe('AddEditDisciplinaComponent', () => {
  let component: AddEditDisciplinaComponent;
  let fixture: ComponentFixture<AddEditDisciplinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDisciplinaComponent]
    });
    fixture = TestBed.createComponent(AddEditDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
