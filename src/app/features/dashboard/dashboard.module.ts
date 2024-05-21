import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from 'src/app/core/custom-material/custom-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
