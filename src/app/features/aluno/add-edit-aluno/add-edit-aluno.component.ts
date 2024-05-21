import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AlunoService } from '../../../shared/services/aluno/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { Aluno } from 'src/app/shared/models/Aluno';

@Component({
  selector: 'app-add-edit-aluno',
  templateUrl: './add-edit-aluno.component.html',
  styleUrls: ['./add-edit-aluno.component.scss'],
})
export class AddEditAlunoComponent {
  aluno = {} as Aluno;
  alunos = [] as Aluno[];

  formAluno!: FormGroup;
  formExistingAluno!: FormGroup;

  isDisabled = true;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private alunoService: AlunoService,
    public dialog: MatDialog
  ) {}

  createform(aluno: Aluno) {
    this.formAluno = this.formBuilder.group({
      id: [aluno.id],
      nome: [aluno.nome, [Validators.required]],
      dataNascimento: [aluno.dataNascimento, [Validators.required]],
      cpf: [aluno.cpf, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.createform(this.aluno);
    this.createExistingAlunoForm();

    this.alunoService.getAluno().subscribe((ret) => {
      this.alunos = ret;
    });
  }

  createExistingAlunoForm() {
    this.formExistingAluno = this.formBuilder.group({
      edit_informacoes: [''],
    });
  }

  onFocus() {
    this.alunoService.getAluno().subscribe((ret) => {
      this.alunos = ret;
    });

    this.alunos.forEach((aluno) => {
      if (aluno.id === this.formExistingAluno.get('edit_informacoes')?.value) {
        this.formAluno.get('id')?.setValue(aluno.id);
      }
    });

    if (this.formExistingAluno.get('edit_informacoes')?.value != null) {
      this.alunos.forEach((item) => {
        if (item.id === this.formExistingAluno.get('edit_informacoes')?.value) {
          this.formAluno.patchValue(item);
          this.isDisabled = false;
          this.isEditing = true;
        }
      });
    }
  }

  clearForm() {
    this.formAluno.reset();
    this.formExistingAluno.reset();

    this.aluno = {} as Aluno;

    this.alunoService.getAluno().subscribe((ret) => {
      this.alunos = ret;
    });

    this.isDisabled = true;
    this.isEditing = false;
  }

  saveAluno(aluno: Aluno) {
    this.alunoService.saveAluno(aluno).subscribe(() => {
      this.notificationService.openSnackBar('Aluno cadastrado com sucesso!');
      this.clearForm();
    });
  }

  updateAluno(aluno: Aluno) {
    this.alunoService.updateAluno(aluno).subscribe(() => {
      this.notificationService.openSnackBar('Aluno atualizado com sucesso!');
      this.clearForm();
    });
  }

  editAluno() {
    const id = this.formAluno.get('id')?.value;
    const novoNome = this.formAluno.get('nome')?.value;
    const novaDataNascimento = this.formAluno.get('dataNascimento')?.value;
    const novoCpf = this.formAluno.get('cpf')?.value;

    if (this.formAluno.valid) {
      this.alunoService.getAluno().subscribe((ret) => {
        ret.forEach((aluno) => {
          if (aluno.id === id) {
            aluno.nome = novoNome;
            aluno.dataNascimento = novaDataNascimento;
            aluno.cpf = novoCpf;
            this.updateAluno(aluno);
          }
        });
      });
    }
  }

  deleteAluno() {
    if (this.formAluno.valid) {
      this.alunoService
        .deleteAluno(this.formAluno.get('id')?.value)
        .subscribe(() => {
          this.notificationService.openSnackBar('Aluno deletado com sucesso!');
        });

      this.clearForm();
    }
  }

  onSubmit() {
    if (this.formAluno.valid && this.isEditing == false) {
      return this.saveAluno(this.formAluno.value);
    }
  }
}
