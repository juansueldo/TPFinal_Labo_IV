import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-form-specialist',
  templateUrl: './form-specialist.component.html',
  styleUrls: ['./form-specialist.component.scss']
})
export class FormSpecialistComponent {
  formRepartidor: FormGroup;
  //@Input() selectedCountry!: Pais;
  @Input() showSignup!: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  constructor() {
  this.formRepartidor = new FormGroup({
    dni: new FormControl('0', {
      validators: [FormValidator.onlyNumbers, Validators.maxLength(8)],
      updateOn: 'change',
    }),
    nombre: new FormControl(null, {
      validators: [FormValidator.onlyLetters],
      updateOn: 'change',
    }),
    edad: new FormControl(18, {
      validators: [FormValidator.onlyNumbers, Validators.min(18)],
      updateOn: 'change',
    }),
    capacidad: new FormControl(1, {
      validators: [FormValidator.onlyNumbers, Validators.min(1)],
      updateOn: 'change',
    }),
    pais: new FormControl(),
    unidad: new FormControl(),
  });
}
ngOnInit(): void {}

onSubmit() {
  this.validateEmptyInputs();
  if (this.formRepartidor.invalid) return;

  const repartidor = {
    dni: this.dni.value,
    nombre: this.nombre.value,
    edad: Number(this.edad.value),
    capacidad_transporte: Number(this.capacidad.value),
    unidad_propia: this.unidad.value,
  };


}

setCountry(pais: any) {
  this.pais.setValue(pais.nombre);
}

validateEmptyInputs() {
  const arrayControls = Object.values(this.formRepartidor.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
}

  get dni() {
    return this.formRepartidor.controls['dni'];
  }
  get nombre() {
    return this.formRepartidor.controls['nombre'];
  }
  get edad() {
    return this.formRepartidor.controls['edad'];
  }
  get capacidad() {
    return this.formRepartidor.controls['capacidad'];
  }
  get unidad() {
    return this.formRepartidor.controls['unidad'];
  }
  get pais() {
    return this.formRepartidor.controls['pais'];  
  }
  
}


