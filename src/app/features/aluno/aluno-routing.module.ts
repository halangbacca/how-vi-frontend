import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAlunoComponent } from './add-edit-aluno/add-edit-aluno.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ListAlunosComponent } from './list-alunos/list-alunos.component';

const routes: Routes = [
  {
    path: '',
    title: 'Cadastrar Aluno',
    component: LayoutComponent,
    children: [
      { path: '', component: AddEditAlunoComponent },
      { path: 'listar', component: ListAlunosComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunoRoutingModule {}
