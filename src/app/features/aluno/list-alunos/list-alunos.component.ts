import { Component } from '@angular/core';
import { Aluno } from 'src/app/shared/models/Aluno';
import { AlunoService } from 'src/app/shared/services/aluno/aluno.service';

@Component({
  selector: 'app-list-alunos',
  templateUrl: './list-alunos.component.html',
  styleUrls: ['./list-alunos.component.scss'],
})
export class ListAlunosComponent {
  alunos = [] as Aluno[];

  displayedColumns: string[] = ['id', 'nome', 'dataNascimento', 'cpf'];

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService.getAluno().subscribe((ret) => {
      this.alunos = ret;
    });
  }
}
