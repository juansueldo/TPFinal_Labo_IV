import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Healthcare } from 'src/app/models/healthcare.models';
import { AuthService } from 'src/app/services/auth.service';
import { HealthcareService } from 'src/app/services/healthcare.service';
import { ImgService } from 'src/app/services/img.service';
import { PatientService } from 'src/app/services/patient.service';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.scss']
})
export class FormPatientComponent {
  formPatient: FormGroup;
  
  @Input() showSignup!: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  imgUrl_1!: string;
  imgUrl_2!: string;
  listHealthcare: any[]=[];

  constructor(private img: ImgService, private patientSerivce: PatientService, private auth: AuthService, private healthcareService: HealthcareService) {
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
    dni: new FormControl(11111111,{
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
ngOnInit(): void {
  this.healthcareService.getHealthcare().subscribe(posts => {
    this.listHealthcare = posts;
  });

}

onSubmit() {
  this.validateEmptyInputs();
  if (this.formPatient.invalid) return;
  const aux = this.name.value + ' ' + this.lastName.value;
  this.auth.register(this.mail.value, this.password.value).then(async res =>{
    await this.auth.updateUser({displayName:aux})
    let user={
      uid: res.user.uid,
      name: res.user.displayName,
      email: res.user.email,
    }
  const patient = {
    id: user.uid,
    name: this.name.value,
    lastName: this.lastName.value,
    age: Number(this.age.value),
    dni: this.dni.value,
    mail: this.mail.value,
    healthcare: this.healthcare.value,
    img_1: this.imgUrl_1,
    img_2: this.imgUrl_2,
  };
  this.loadingEvent.emit(true);
  this.patientSerivce.addPatient(patient).then((res) => {
    this.loadingEvent.emit(false);
    this.formPatient.reset();
  });

  });
}
uploadPhoto_1(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.img.uploadImage(file, 'images/' + file.name).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.imgUrl_1 = url;
    });
  }
}
uploadPhoto_2(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.img.uploadImage(file, 'images/' + file.name).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.imgUrl_2 = url;
    });
  }
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

