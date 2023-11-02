import { NgModule } from '@angular/core';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  declarations: [CustomInputComponent,NavbarComponent],
  exports: [CustomInputComponent,NavbarComponent],
  imports: [ReactiveFormsModule],
})
export class SharedModule { }
