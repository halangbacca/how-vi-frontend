import { Component } from '@angular/core';
import { Disciplina } from 'src/app/shared/models/Disciplina';
import { DisciplinaService } from 'src/app/shared/services/disciplina/disciplina.service';

@Component({
  selector: 'app-list-disciplinas',
  templateUrl: './list-disciplinas.component.html',
  styleUrls: ['./list-disciplinas.component.scss'],
})
export class ListDisciplinasComponent {
  disciplinas = [] as Disciplina[];

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'cargaHoraria'];

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.disciplinaService.getDisciplina().subscribe((ret) => {
      this.disciplinas = ret;
    });
  }
}
