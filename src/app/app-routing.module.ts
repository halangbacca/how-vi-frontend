import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'aluno',
    loadChildren: () =>
      import('./features/aluno/aluno.module').then((m) => m.AlunoModule),
  },
  {
    path: 'disciplina',
    loadChildren: () =>
      import('./features/disciplina/disciplina.module').then(
        (m) => m.DisciplinaModule
      ),
  },
  {
    path: 'matricula',
    loadChildren: () =>
      import('./features/matricula/matricula.module').then(
        (m) => m.MatriculaModule
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
