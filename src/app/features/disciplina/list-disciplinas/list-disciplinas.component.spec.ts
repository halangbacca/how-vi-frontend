import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisciplinasComponent } from './list-disciplinas.component';

describe('ListDisciplinasComponent', () => {
  let component: ListDisciplinasComponent;
  let fixture: ComponentFixture<ListDisciplinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDisciplinasComponent]
    });
    fixture = TestBed.createComponent(ListDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
