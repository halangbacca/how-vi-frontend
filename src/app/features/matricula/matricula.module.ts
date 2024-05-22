import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from 'src/app/core/custom-material/custom-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { RegistroMatriculaComponent } from './registro-matricula/registro-matricula.component';
import { ListMatriculaComponent } from './list-matricula/list-matricula.component';

@NgModule({
  declarations: [RegistroMatriculaComponent, ListMatriculaComponent],
  imports: [
    CommonModule,
    MatriculaRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class MatriculaModule {}
