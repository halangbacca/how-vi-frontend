import { Component } from '@angular/core';
import { Aluno } from 'src/app/shared/models/Aluno';
import { Disciplina } from 'src/app/shared/models/Disciplina';
import { Matricula } from 'src/app/shared/models/Matricula';
import { AlunoService } from 'src/app/shared/services/aluno/aluno.service';
import { DisciplinaService } from 'src/app/shared/services/disciplina/disciplina.service';
import { MatriculaService } from 'src/app/shared/services/matricula/matricula.service';
declare var google: any;

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent {
  alunos = [] as Aluno[];
  disciplinas = [] as Disciplina[];
  matriculas = [] as Matricula[];

  filteredAlunos = [] as Aluno[];
  filteredDisciplinas = [] as Disciplina[];

  qtAlunos: number = 0;
  qtDisciplinas: number = 0;
  qtdMatriculas: number = 0;

  constructor(
    private alunoService: AlunoService,
    private disciplinaService: DisciplinaService,
    private matriculaService: MatriculaService
  ) {}

  ngOnInit() {
    this.alunoService.getAluno().subscribe((aluno) => {
      this.alunos = aluno;
      this.filteredAlunos = aluno;
      this.qtAlunos = aluno.length;
    });

    this.disciplinaService.getDisciplina().subscribe((disciplina) => {
      this.disciplinas = disciplina;
      this.filteredDisciplinas = disciplina;
      this.qtDisciplinas = disciplina.length;
    });

    this.matriculaService.getMatricula().subscribe((matricula) => {
      this.qtdMatriculas = matricula.length;
    });

    google.charts.load('current', { packages: ['bar'] });
    google.charts.setOnLoadCallback(() => {
      var data = google.visualization.arrayToDataTable([
        ['', 'Alunos', 'Disciplinas', 'Matrículas'],
        ['Estatísticas', this.qtAlunos, this.qtDisciplinas, this.qtdMatriculas],
      ]);

      var options = {
        chart: {},
        bars: 'vertical',
      };

      var chart = new google.charts.Bar(
        document.getElementById('barchart_material')
      );

      chart.draw(data, google.charts.Bar.convertOptions(options));
    });
  }

  searchAluno(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filteredAlunos = this.alunos.filter((data) => {
      return (
        data.nome.toLowerCase().includes(value.toLowerCase()) ||
        data.cpf.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  searchDisciplina(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filteredDisciplinas = this.disciplinas.filter((data) => {
      return (
        data.nome.toLowerCase().includes(value.toLowerCase()) ||
        data.descricao.toLowerCase().includes(value.toLowerCase()) ||
        data.cargaHoraria.includes(value.toLowerCase())
      );
    });
  }
}
