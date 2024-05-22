import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { RegistroMatriculaComponent } from './registro-matricula/registro-matricula.component';
import { ListMatriculaComponent } from './list-matricula/list-matricula.component';

const routes: Routes = [
  {
    path: '',
    title: 'Efetuar Matrícula',
    component: LayoutComponent,
    children: [
      { path: '', component: RegistroMatriculaComponent },
      { path: 'listar', component: ListMatriculaComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatriculaRoutingModule {}
