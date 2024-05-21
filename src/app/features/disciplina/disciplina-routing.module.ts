import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { AddEditDisciplinaComponent } from './add-edit-disciplina/add-edit-disciplina.component';
import { ListDisciplinasComponent } from './list-disciplinas/list-disciplinas.component';

const routes: Routes = [
  {
    path: '',
    title: 'Cadastrar Disciplina',
    component: LayoutComponent,
    children: [
      { path: '', component: AddEditDisciplinaComponent },
      { path: 'listar', component: ListDisciplinasComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisciplinaRoutingModule {}
