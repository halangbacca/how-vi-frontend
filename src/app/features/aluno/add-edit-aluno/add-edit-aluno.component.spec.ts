import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAlunoComponent } from './add-edit-aluno.component';

describe('AddEditAlunoComponent', () => {
  let component: AddEditAlunoComponent;
  let fixture: ComponentFixture<AddEditAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAlunoComponent],
    });
    fixture = TestBed.createComponent(AddEditAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
