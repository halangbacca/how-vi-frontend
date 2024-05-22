import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Aluno } from 'src/app/shared/models/Aluno';
import { Disciplina } from 'src/app/shared/models/Disciplina';
import { Matricula } from 'src/app/shared/models/Matricula';
import { AlunoService } from 'src/app/shared/services/aluno/aluno.service';
import { DisciplinaService } from 'src/app/shared/services/disciplina/disciplina.service';
import { MatriculaService } from 'src/app/shared/services/matricula/matricula.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-registro-matricula',
  templateUrl: './registro-matricula.component.html',
  styleUrls: ['./registro-matricula.component.scss'],
})
export class RegistroMatriculaComponent {
  matricula = {} as Matricula;

  disciplinas = [] as Disciplina[];
  alunos = [] as Aluno[];

  formExistingData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private alunoService: AlunoService,
    private disciplinaService: DisciplinaService,
    private matriculaService: MatriculaService,
    public dialog: MatDialog
  ) {}

  createform(matricula: Matricula) {
    this.formExistingData = this.formBuilder.group({
      disciplinaFk: [matricula.disciplinaFk],
      alunoFk: [matricula.alunoFk],
    });
  }

  ngOnInit(): void {
    this.createform(this.matricula);
    this.createExistingDataForm();

    this.disciplinaService.getDisciplina().subscribe((ret) => {
      this.disciplinas = ret;
    });

    this.alunoService.getAluno().subscribe((ret) => {
      this.alunos = ret;
    });
  }

  createExistingDataForm() {
    this.formExistingData = this.formBuilder.group({
      disciplinaFk: [''],
      alunoFk: [''],
    });
  }

  onFocus() {
    this.disciplinaService.getDisciplina().subscribe((ret) => {
      this.disciplinas = ret;
    });

    this.disciplinas.forEach((disciplina) => {
      if (disciplina.id === this.formExistingData.get('disciplinaFk')?.value) {
        this.formExistingData.get('id')?.setValue(disciplina.id);
      }
    });

    this.alunos.forEach((aluno) => {
      if (aluno.id === this.formExistingData.get('alunoFk')?.value) {
        this.formExistingData.get('id')?.setValue(aluno.id);
      }
    });
  }

  clearForm() {
    this.formExistingData.reset();

    this.matricula = {} as Matricula;

    this.disciplinaService.getDisciplina().subscribe((ret) => {
      this.disciplinas = ret;
    });

    this.alunoService.getAluno().subscribe((ret) => {
      this.alunos = ret;
    });
  }

  efetuarMatricula(matricula: Matricula) {
    this.matriculaService.efetuarMatricula(matricula).subscribe(() => {
      this.notificationService.openSnackBar('Matrícula efetuada com sucesso!');
      this.clearForm();
    });
  }

  onSubmit() {
    console.log(this.formExistingData.value)
    if (this.formExistingData.valid) {
      return this.efetuarMatricula(this.formExistingData.value);
    }
  }
}
