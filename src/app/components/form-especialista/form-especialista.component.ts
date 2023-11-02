import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Especialista, Registro } from 'src/app/models/especialista.models';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { ImgService } from 'src/app/services/img.service';
import { FormValidator } from 'src/app/validators/form-validators';
import { Especialidad } from 'src/app/models/interfaces.models';
@Component({
  selector: 'app-form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrls: ['./form-especialista.component.scss']
})
export class FormEspecialistaComponent {
  formEspecialista: FormGroup;
  
  @Input() showSignup: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  imgUrl_1!: string;
  espcialidadSeleccionada: Especialidad[]=[];
  alerta: string = '';
  constructor(
    private img: ImgService, 
    private especialistasService: EspecialistasService,
    private auth: AuthService,
    private snackBar: SnackbarService,
    private router: Router, 
    ) {
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
  });
}
ngOnInit(): void {
  

}
handleItemSelected(selectedItems: Especialidad[]) {
  this.espcialidadSeleccionada = selectedItems;
}
onSubmit() {
  this.validateEmptyInputs();
  this.loadingEvent.emit(true);
  if (this.formEspecialista.invalid) {
    this.loadingEvent.emit(false);
    return;
  }

  const aux = this.nombre.value + ' ' + this.apellido.value;
  let user: any;

  this.auth
    .register(this.email.value, this.clave.value)
    .then(async (res) => {
      user = {
        uid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
      };

      return this.auth.confirmarMail(res);
    })
    .then(() => {
      const especialista: Especialista = {
        id: user.uid,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        edad: Number(this.edad.value),
        dni: this.dni.value,
        email: this.email.value,
        especialidades: this.espcialidadSeleccionada,
        img_1: this.imgUrl_1,
        estados: {
          registro: Registro.pendiente,
        },
        tipo: 'especialista'
      };

      return this.especialistasService.agregarEspecialista(especialista);
    })
    .then(() => {
      this.alerta = `¡Bienvenido ${user.email}! Su cuenta está pendiente de aprobación`;
      this.auth.saveLog(user.email);
      this.snackBar.showSnackBar(this.alerta, 'cerrar', 3500);
      this.router.navigate(['/bienvenida']);
      this.formEspecialista.reset();
      this.espcialidadSeleccionada = [];
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        this.alerta = 'El correo electrónico ya está en uso.';
      } else {
        this.alerta = 'Ocurrió un error al registrar la cuenta.';
      }

      this.snackBar.showSnackBar(this.alerta, 'cerrar', 3500);
    })
    .finally(() => {
      this.loadingEvent.emit(false);
    });
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
  const arrayControls = Object.values(this.formEspecialista.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
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
  
}
