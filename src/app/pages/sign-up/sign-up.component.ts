import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormPatientComponent } from 'src/app/components/form-patient/form-patient.component';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public loading = false;
  public user!: any;
  public signup: boolean = false;
  @ViewChild('form') form!: FormPatientComponent;

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;

  },2500);
    this.cargarUsuario();
  }
  cargarUsuario() {
   
  }
  isSpecialist(){
    this.signup = true;
  }
  isPatient(){
    this.signup = false;
  }
}
