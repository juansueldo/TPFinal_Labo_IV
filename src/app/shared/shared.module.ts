import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardAdminComponent } from '../components/dashboard-admin/dashboard-admin.component';
@NgModule({
  declarations: [CustomInputComponent,NavbarComponent,DashboardAdminComponent],
  exports: [CustomInputComponent,NavbarComponent,DashboardAdminComponent],
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
})
export class SharedModule { }
