import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from 'src/app/core/custom-material/custom-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  declarations: [AddEditProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class ProjectModule {}
