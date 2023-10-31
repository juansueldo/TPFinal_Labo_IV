import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ImgService } from 'src/app/services/img.service';
import { SpecialistService } from 'src/app/services/specialist.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { FormValidator } from 'src/app/validators/form-validators';
import { Specialist } from 'src/app/models/specialist';

@Component({
  selector: 'app-form-specialist',
  templateUrl: './form-specialist.component.html',
  styleUrls: ['./form-specialist.component.scss']
})
export class FormSpecialistComponent {
  formSpecialist: FormGroup;
  
  @Input() showSignup!: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  imgUrl_1!: string;
  listSpecialty: any[]=[];
  selectSpecialy: any[]=[];
  constructor(private img: ImgService, private specialistService: SpecialistService, private auth: AuthService, private specialtyService: SpecialtyService) {
  this.formSpecialist = new FormGroup({
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
    specialty: new FormControl(),
  });
}
ngOnInit(): void {
  this.specialtyService.getSpecialty().subscribe(posts => {
    this.listSpecialty = posts;
  });

}

onSubmit() {
  this.validateEmptyInputs();
  if (this.formSpecialist.invalid) return;
  const aux = this.name.value + ' ' + this.lastName.value;
  this.auth.register(this.mail.value, this.password.value).then(async res =>{
    await this.auth.updateUser({displayName:aux})
    let user={
      uid: res.user.uid,
      name: res.user.displayName,
      email: res.user.email,
    }
  const specialist = {
    id: user.uid,
    name: this.name.value,
    lastName: this.lastName.value,
    age: Number(this.age.value),
    dni: this.dni.value,
    mail: this.mail.value,
    specialty: this.specialty.value,
    img_1: this.imgUrl_1,
  };
  this.loadingEvent.emit(true);
  this.specialistService.addSpecialist(specialist).then((res) => {
    this.loadingEvent.emit(false);
    this.formSpecialist.reset();
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
validateEmptyInputs() {
  const arrayControls = Object.values(this.formSpecialist.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
}
addSpecialty(item: any){
  this.selectSpecialy.push(item);
  console.log(this.selectSpecialy);
}
  get name() {
    return this.formSpecialist.controls['name'];
  }
  get lastName() {
    return this.formSpecialist.controls['lastName'];
  }
  get age() {
    return this.formSpecialist.controls['age'];
  }
  get dni() {
    return this.formSpecialist.controls['dni'];
  }
  get mail() {
    return this.formSpecialist.controls['mail'];
  }
  get password() {
    return this.formSpecialist.controls['password'];
  }
  get specialty() {
    return this.formSpecialist.controls['specialty'];
  }
 
  
}

