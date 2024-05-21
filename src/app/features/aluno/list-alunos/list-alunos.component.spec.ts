import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlunosComponent } from './list-alunos.component';

describe('ListAlunosComponent', () => {
  let component: ListAlunosComponent;
  let fixture: ComponentFixture<ListAlunosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAlunosComponent]
    });
    fixture = TestBed.createComponent(ListAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
