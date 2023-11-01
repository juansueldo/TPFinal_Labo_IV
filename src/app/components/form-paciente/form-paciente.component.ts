import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente.models';
import { AuthService } from 'src/app/services/auth.service';
import { ImgService } from 'src/app/services/img.service';
import { ObrasocialService } from 'src/app/services/obrasocial.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.scss']
})
export class FormPacienteComponent {
  formPaciente: FormGroup;
  
  @Input() showSignup!: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  imgUrl_1!: string;
  imgUrl_2!: string;
  listadoObraSocial: any[]=[];

  constructor(private img: ImgService, private pacienteService: PacienteService, private auth: AuthService, private obraSocialService: ObrasocialService) {
  this.formPaciente = new FormGroup({
    nombre: new FormControl(null, {
      validators: [FormValidator.onlyLetters],
      updateOn: 'change',
    }),
    apellido: new FormControl(null, {
      validators: [FormValidator.onlyLetters],
      updateOn: 'change',
    }),
    edad: new FormControl('0', {
      validators: [FormValidator.onlyNumbers, Validators.maxLength(3), Validators.max(125), Validators.min(0)],
      updateOn: 'change',
    }),
    dni: new FormControl(11111111,{
      validators: [FormValidator.onlyNumbers, Validators.maxLength(8), Validators.minLength(7)],
      updateOn: 'change',
    }),
    email: new FormControl(null,{
      validators: [Validators.email],
      updateOn: 'change',
    }),
    clave: new FormControl('',{
      validators: [Validators.minLength(6)],
      updateOn: 'change',
    }),
    obraSocial: new FormControl(),
  });
}
ngOnInit(): void {
  this.obraSocialService.obtenerObrasSociales().subscribe(posts => {
    this.listadoObraSocial = posts;
  });

}

onSubmit() {
  this.validateEmptyInputs();
  if (this.formPaciente.invalid) return;
  const aux = this.nombre.value + ' ' + this.apellido.value;
  this.auth.register(this.email.value, this.clave.value).then(async res =>{
    await this.auth.updateUser({displayName:aux})
    let user={
      uid: res.user.uid,
      name: res.user.displayName,
      email: res.user.email,
    }
  const paciente: Paciente = {
    id: user.uid,
    nombre: this.nombre.value,
    apellido: this.apellido.value,
    edad: Number(this.edad.value),
    dni: this.dni.value,
    email: this.email.value,
    obraSocial: this.obraSocial.value,
    img_1: this.imgUrl_1,
    img_2: this.imgUrl_2,
  };
  this.loadingEvent.emit(true);
  this.pacienteService.agregarPaciente(paciente).then((res) => {
    this.loadingEvent.emit(false);
    this.formPaciente.reset();
  });

  });
}
subirFoto_1(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.img.uploadImage(file, 'imagenes/' + file.name).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.imgUrl_1 = url;
    });
  }
}
subirFoto_2(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.img.uploadImage(file, 'imagenes/' + file.name).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.imgUrl_2 = url;
    });
  }
}
validateEmptyInputs() {
  const arrayControls = Object.values(this.formPaciente.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
}

  get nombre() {
    return this.formPaciente.controls['nombre'];
  }
  get apellido() {
    return this.formPaciente.controls['apellido'];
  }
  get edad() {
    return this.formPaciente.controls['edad'];
  }
  get dni() {
    return this.formPaciente.controls['dni'];
  }
  get email() {
    return this.formPaciente.controls['email'];
  }
  get clave() {
    return this.formPaciente.controls['clave'];
  }
  get obraSocial() {
    return this.formPaciente.controls['obraSocial'];
  }
}
