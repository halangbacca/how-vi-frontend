import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatriculaComponent } from './list-matricula.component';

describe('ListMatriculaComponent', () => {
  let component: ListMatriculaComponent;
  let fixture: ComponentFixture<ListMatriculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMatriculaComponent]
    });
    fixture = TestBed.createComponent(ListMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
