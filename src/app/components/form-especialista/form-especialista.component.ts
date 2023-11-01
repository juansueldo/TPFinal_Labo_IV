import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Especialista } from 'src/app/models/especialista.models';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { ImgService } from 'src/app/services/img.service';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrls: ['./form-especialista.component.scss']
})
export class FormEspecialistaComponent {
  formEspecialista: FormGroup;
  
  @Input() showSignup!: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  imgUrl_1!: string;
  listaEspecialidades: any[]=[];
  espcialidadSeleccionada: any[]=[];
  constructor(private img: ImgService, private especialistasService: EspecialistasService, private auth: AuthService, private especialidadesService: EspecialidadesService) {
  this.formEspecialista = new FormGroup({
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
    especialidades: new FormControl(),
  });
}
ngOnInit(): void {
  this.especialidadesService.obtenerEspecialidades().subscribe(posts => {
    this.listaEspecialidades = posts;
  });

}

onSubmit() {
  this.validateEmptyInputs();
  if (this.formEspecialista.invalid) return;
  const aux = this.nombre.value + ' ' + this.apellido.value;
  this.auth.register(this.email.value, this.clave.value).then(async res =>{
    await this.auth.updateUser({displayName:aux})
    let user={
      uid: res.user.uid,
      name: res.user.displayName,
      email: res.user.email,
    }
  const especialista: Especialista = {
    id: user.uid,
    nombre: this.nombre.value,
    apellido: this.apellido.value,
    edad: Number(this.edad.value),
    dni: this.dni.value,
    email: this.email.value,
    especialidades: this.especialidades.value,
    img_1: this.imgUrl_1,
  };
  this.loadingEvent.emit(true);
  this.especialistasService.agregarEspecialista(especialista).then((res) => {
    this.loadingEvent.emit(false);
    this.formEspecialista.reset();
  });

  });
}
subirFoto(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.img.uploadImage(file, 'imagenes/' + file.name).subscribe(url => {
      console.log('URL de la imagen:', url);
      this.imgUrl_1 = url;
    });
  }
}
validateEmptyInputs() {
  const arrayControls = Object.values(this.formEspecialista.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
}
addSpecialty(item: any){
  this.espcialidadSeleccionada.push(item);
  console.log(this.espcialidadSeleccionada);
}
  get nombre() {
    return this.formEspecialista.controls['nombre'];
  }
  get apellido() {
    return this.formEspecialista.controls['apellido'];
  }
  get edad() {
    return this.formEspecialista.controls['edad'];
  }
  get dni() {
    return this.formEspecialista.controls['dni'];
  }
  get email() {
    return this.formEspecialista.controls['email'];
  }
  get clave() {
    return this.formEspecialista.controls['clave'];
  }
  get especialidades() {
    return this.formEspecialista.controls['especialidades'];
  }
}
