import { NgModule } from '@angular/core';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardAdminComponent } from '../components/dashboard-admin/dashboard-admin.component';
@NgModule({
  declarations: [CustomInputComponent,NavbarComponent,DashboardAdminComponent],
  exports: [CustomInputComponent,NavbarComponent,DashboardAdminComponent],
  imports: [ReactiveFormsModule],
})
export class SharedModule { }
