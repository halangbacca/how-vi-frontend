import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from 'src/app/core/custom-material/custom-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AddEditAlunoComponent } from './add-edit-aluno/add-edit-aluno.component';
import { AlunoRoutingModule } from './aluno-routing.module';
import { ListAlunosComponent } from './list-alunos/list-alunos.component';

@NgModule({
  declarations: [AddEditAlunoComponent, ListAlunosComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class AlunoModule {}
