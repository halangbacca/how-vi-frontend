import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Disciplina } from 'src/app/shared/models/Disciplina';
import { DisciplinaService } from 'src/app/shared/services/disciplina/disciplina.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-add-edit-disciplina',
  templateUrl: './add-edit-disciplina.component.html',
  styleUrls: ['./add-edit-disciplina.component.scss'],
})
export class AddEditDisciplinaComponent {
  disciplina = {} as Disciplina;
  disciplinas = [] as Disciplina[];

  formDisciplina!: FormGroup;
  formExistingDisciplina!: FormGroup;

  isDisabled = true;
  isEditing = false;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private disciplinaService: DisciplinaService,
    public dialog: MatDialog
  ) {}

  createform(disciplina: Disciplina) {
    this.formDisciplina = this.formBuilder.group({
      id: [disciplina.id],
      nome: [disciplina.nome, [Validators.required]],
      descricao: [disciplina.descricao, [Validators.required]],
      cargaHoraria: [disciplina.cargaHoraria, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.createform(this.disciplina);
    this.createExistingDisciplinaForm();

    this.disciplinaService.getDisciplina().subscribe((ret) => {
      this.disciplinas = ret;
    });
  }

  createExistingDisciplinaForm() {
    this.formExistingDisciplina = this.formBuilder.group({
      edit_informacoes: [''],
    });
  }

  onFocus() {
    this.disciplinaService.getDisciplina().subscribe((ret) => {
      this.disciplinas = ret;
    });

    this.disciplinas.forEach((disciplina) => {
      if (
        disciplina.id ===
        this.formExistingDisciplina.get('edit_informacoes')?.value
      ) {
        this.formDisciplina.get('id')?.setValue(disciplina.id);
      }
    });

    if (this.formExistingDisciplina.get('edit_informacoes')?.value != null) {
      this.disciplinas.forEach((item) => {
        if (
          item.id === this.formExistingDisciplina.get('edit_informacoes')?.value
        ) {
          this.formDisciplina.patchValue(item);
          this.isDisabled = false;
          this.isEditing = true;
        }
      });
    }
  }

  clearForm() {
    this.formDisciplina.reset();
    this.formExistingDisciplina.reset();

    this.disciplina = {} as Disciplina;

    this.disciplinaService.getDisciplina().subscribe((ret) => {
      this.disciplinas = ret;
    });

    this.isDisabled = true;
    this.isEditing = false;
  }

  saveDisciplina(disciplina: Disciplina) {
    this.disciplinaService.saveDisciplina(disciplina).subscribe(() => {
      this.notificationService.openSnackBar(
        'Disciplina cadastrada com sucesso!'
      );
      this.clearForm();
    });
  }

  updateDisciplina(disciplina: Disciplina) {
    this.disciplinaService.updateDisciplina(disciplina).subscribe(() => {
      this.notificationService.openSnackBar(
        'Discilina atualizada com sucesso!'
      );
      this.clearForm();
    });
  }

  editDisciplina() {
    const id = this.formDisciplina.get('id')?.value;
    const novoNome = this.formDisciplina.get('nome')?.value;
    const novaDescricao = this.formDisciplina.get('descricao')?.value;
    const novaCargaHoraria = this.formDisciplina.get('cargaHoraria')?.value;

    if (this.formDisciplina.valid) {
      this.disciplinaService.getDisciplina().subscribe((ret) => {
        ret.forEach((disciplina) => {
          if (disciplina.id === id) {
            disciplina.nome = novoNome;
            disciplina.descricao = novaDescricao;
            disciplina.cargaHoraria = novaCargaHoraria;
            this.updateDisciplina(disciplina);
          }
        });
      });
    }
  }

  deleteDisciplina() {
    if (this.formDisciplina.valid) {
      this.disciplinaService
        .deleteDisciplina(this.formDisciplina.get('id')?.value)
        .subscribe(() => {
          this.notificationService.openSnackBar(
            'Disciplina deletada com sucesso!'
          );
        });

      this.clearForm();
    }
  }

  onSubmit() {
    if (this.formDisciplina.valid && this.isEditing == false) {
      return this.saveDisciplina(this.formDisciplina.value);
    }
  }
}
