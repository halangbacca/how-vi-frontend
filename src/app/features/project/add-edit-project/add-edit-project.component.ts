import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProjectService } from '../../../shared/services/project/project.service';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss'],
})
export class AddEditProjectComponent {
  project = {} as Project;
  projects = [] as Project[];

  formProject!: FormGroup;
  formExistingProject!: FormGroup;

  isDisabled = true;
  isEditing = false;

  today!: Date;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
    this.today = new Date();
  }

  createform(project: Project) {
    this.formProject = this.formBuilder.group({
      id: [project.id],
      informacoes: [project.informacoes, [Validators.required]],
      outsourcing: [project.outsourcing, [Validators.required]],
      inicio: [project.inicio, [Validators.required]],
      encerramento: [project.encerramento, [Validators.required]],
      horas_executadas: [project.horas_executadas, [Validators.required]],
      horas_orcadas: [project.horas_orcadas, [Validators.required]],
      cancelado: [project.cancelado, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.createform(this.project);
    this.createExistingProjectForm();

    this.projectService.getProject().subscribe((ret) => {
      this.projects = ret;
    });
  }

  createExistingProjectForm() {
    this.formExistingProject = this.formBuilder.group({
      edit_informacoes: [''],
    });
  }

  onFocus() {
    this.projectService.getProject().subscribe((ret) => {
      this.projects = ret;
    });

    this.projects.forEach((project) => {
      if (
        project.id === this.formExistingProject.get('edit_informacoes')?.value
      ) {
        this.formProject.get('id')?.setValue(project.id);
      }
    });

    if (this.formExistingProject.get('edit_informacoes')?.value != null) {
      this.projects.forEach((item) => {
        if (
          item.id === this.formExistingProject.get('edit_informacoes')?.value
        ) {
          this.formProject.patchValue(item);
          this.isDisabled = false;
          this.isEditing = true;
        }
      });
    }
  }

  clearForm() {
    this.formProject.reset();
    this.formExistingProject.reset();

    this.project = {} as Project;

    this.projectService.getProject().subscribe((ret) => {
      this.projects = ret;
    });

    this.isDisabled = true;
    this.isEditing = false;
  }

  saveProject(project: Project) {
    this.projectService.saveProject(project).subscribe(() => {
      this.notificationService.openSnackBar('Projeto cadastrado com sucesso!');
      this.clearForm();
    });
  }

  updateProject(project: Project) {
    this.projectService.updateProject(project).subscribe(() => {
      this.notificationService.openSnackBar('Projeto atualizado com sucesso!');
      this.clearForm();
    });
  }

  editProject() {
    const id = this.formProject.get('id')?.value;
    const novasInformacoes = this.formProject.get('informacoes')?.value;
    const novoOutsourcing = this.formProject.get('outsourcing')?.value;
    const novoInicio = this.formProject.get('inicio')?.value;
    const novoEncerramento = this.formProject.get('encerramento')?.value;
    const novaHorasOrcadas = this.formProject.get('horas_orcadas')?.value;
    const novaHorasExecutadas = this.formProject.get('horas_executadas')?.value;
    const novoCancelado = this.formProject.get('cancelado')?.value;

    if (this.formProject.valid) {
      this.projectService.getProject().subscribe((ret) => {
        ret.forEach((project) => {
          if (project.id === id) {
            project.informacoes = novasInformacoes;
            project.outsourcing = novoOutsourcing;
            project.inicio = novoInicio;
            project.encerramento = novoEncerramento;
            project.horas_orcadas = novaHorasOrcadas;
            project.horas_executadas = novaHorasExecutadas;
            project.cancelado = novoCancelado;
            this.updateProject(project);
          }
        });
      });
    }
  }

  deleteProject() {
    if (this.formProject.valid) {
      this.projectService
        .deleteProject(this.formProject.get('id')?.value)
        .subscribe(() => {
          this.notificationService.openSnackBar(
            'Projeto deletado com sucesso!'
          );
        });

      this.clearForm();
    }
  }

  onSubmit() {
    if (this.formProject.valid && this.isEditing == false) {
      return this.saveProject(this.formProject.value);
    }
  }
}
