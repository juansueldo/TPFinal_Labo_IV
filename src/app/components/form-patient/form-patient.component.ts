import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss']
})
export class FormPatientComponent {
  formPatient: FormGroup;
  //@Input() selectedCountry!: Pais;
  @Input() showSignup!: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  constructor() {
  this.formPatient = new FormGroup({
    name: new FormControl(null, {
      validators: [FormValidator.onlyLetters],
      updateOn: 'change',
    }),
    lastName: new FormControl(null, {
      validators: [FormValidator.onlyLetters],
      updateOn: 'change',
    }),
    age: new FormControl('0', {
      validators: [FormValidator.onlyNumbers, Validators.maxLength(3), Validators.max(125), Validators.min(0)],
      updateOn: 'change',
    }),
    dni: new FormControl(null,{
      validators: [FormValidator.onlyNumbers, Validators.maxLength(8), Validators.minLength(7)],
      updateOn: 'change',
    }),
    mail: new FormControl(null,{
      validators: [Validators.email],
      updateOn: 'change',
    }),
    password: new FormControl('',{
      validators: [Validators.minLength(6)],
      updateOn: 'change',
    }),
    healthcare: new FormControl(),
  });
}
ngOnInit(): void {}

onSubmit() {
  this.validateEmptyInputs();
  if (this.formPatient.invalid) return;

  const patient = {
    name: this.name.value,
    lastName: this.lastName.value,
    age: Number(this.age.value),
    dni: Number(this.dni.value),
    mail: this.mail.value,
    healthcare: this.healthcare.value,
  };


}

validateEmptyInputs() {
  const arrayControls = Object.values(this.formPatient.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
}

  get name() {
    return this.formPatient.controls['name'];
  }
  get lastName() {
    return this.formPatient.controls['lastName'];
  }
  get age() {
    return this.formPatient.controls['age'];
  }
  get dni() {
    return this.formPatient.controls['dni'];
  }
  get mail() {
    return this.formPatient.controls['mail'];
  }
  get password() {
    return this.formPatient.controls['password'];
  }
  get healthcare() {
    return this.formPatient.controls['healthcare'];
  }
 
  
}

