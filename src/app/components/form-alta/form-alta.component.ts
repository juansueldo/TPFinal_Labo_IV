import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista, Registro } from 'src/app/models/especialista.models';
import { Especialidad, ObraSocial } from 'src/app/models/interfaces.models';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { ImgService } from 'src/app/services/img.service';
import { ObrasocialService } from 'src/app/services/obrasocial.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss']
})
export class FormAltaComponent {
  form: FormGroup;
  
  @Input() showSignup: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Input() tipoUsuario: string;
  imgUrl_1!: string;
  imgUrl_2!: string;
  espcialidadSeleccionada: Especialidad[]=[];
  alerta: string = '';
  buttonDisabled: boolean = true;
  listadoObraSocial: any[]=[];
  
  constructor(
    private img: ImgService, 
    private especialistasService: EspecialistasService,
    private auth: AuthService,
    private snackBar: SnackbarService,
    private router: Router, 
    private obraSocialService: ObrasocialService
    ) {
  this.form = new FormGroup({
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

handleItemSelected(selectedItems: Especialidad[]) {
  this.espcialidadSeleccionada = selectedItems;
}
onSubmit() {
  
}

subirFoto(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.img.uploadImage(file, 'imagenes/' + file.name).subscribe(url => {
      this.imgUrl_1 = url;
    });
  }
}
validateEmptyInputs() {
  const arrayControls = Object.values(this.form.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
}

  get nombre() {
    return this.form.controls['nombre'];
  }
  get apellido() {
    return this.form.controls['apellido'];
  }
  get edad() {
    return this.form.controls['edad'];
  }
  get dni() {
    return this.form.controls['dni'];
  }
  get email() {
    return this.form.controls['email'];
  }
  get clave() {
    return this.form.controls['clave'];
  }
  handleCaptchaSuccess(captchaResult: boolean) {
    if (captchaResult) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled =true;
    }
  }
  subirFoto_2(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.img.uploadImage(file, 'imagenes/' + file.name).subscribe(url => {
        this.imgUrl_2 = url;
      });
    }
  }
  
}


