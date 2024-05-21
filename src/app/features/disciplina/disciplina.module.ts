import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from 'src/app/core/custom-material/custom-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { DisciplinaRoutingModule } from './disciplina-routing.module';
import { AddEditDisciplinaComponent } from './add-edit-disciplina/add-edit-disciplina.component';
import { ListDisciplinasComponent } from './list-disciplinas/list-disciplinas.component';

@NgModule({
  declarations: [AddEditDisciplinaComponent, ListDisciplinasComponent],
  imports: [
    CommonModule,
    DisciplinaRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class DisciplinaModule {}
