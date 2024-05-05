import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    title: 'Vertex PMS - Cadastrar Projeto',
    component: LayoutComponent,
    children: [{ path: '', component: AddEditProjectComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
