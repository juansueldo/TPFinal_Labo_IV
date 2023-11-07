import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.models';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImgService } from 'src/app/services/img.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormValidator } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.scss']
})
export class FormAdminComponent {
  formAdmin: FormGroup;
  
  @Input() showSignup: boolean;
  @Output() loadingEvent = new EventEmitter<boolean>();
  imgUrl_1!: string;
  espcialidadSeleccionada: Admin[]=[];
  alerta: string = '';
  buttonDisabled: boolean = true;
  constructor(
    private img: ImgService, 
    private especialistasService: AdminService,
    private auth: AuthService,
    private snackBar: SnackbarService,
    private router: Router, 
    ) {
  this.formAdmin = new FormGroup({
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

onSubmit() {
  this.validateEmptyInputs();
  this.loadingEvent.emit(true);
  if (this.formAdmin.invalid) {
    this.loadingEvent.emit(false);
    return;
  }

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
    .catch((error) => {
      console.log(error.message);
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        this.alerta = 'El correo electrónico ya está en uso.';
      } else {
        this.alerta = 'Ocurrió un error al registrar la cuenta.';
      }

      this.snackBar.showSnackBar(this.alerta, 'cerrar', 3500);
    })
    .then(() => {
      const admin: Admin = {
        id: user.uid,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        edad: Number(this.edad.value),
        dni: this.dni.value,
        email: this.email.value,
        img_1: this.imgUrl_1,
        tipo: 'admin'
      };

      return this.especialistasService.agregarAdmin(admin);
    })
    .then(() => {
      this.alerta = `¡Bienvenido ${user.email}! Su cuenta está pendiente de aprobación`;
      this.auth.saveLog(user.email);
      this.snackBar.showSnackBar(this.alerta, 'cerrar', 3500);
      this.router.navigate(['/bienvenida']);
      this.formAdmin.reset();
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
  const arrayControls = Object.values(this.formAdmin.controls).map(
    (obj) => obj
  );
  arrayControls.forEach((control) => {
    if (!control.value) {
      control.setErrors({ invalid: true });
    }
  });
}

  get nombre() {
    return this.formAdmin.controls['nombre'];
  }
  get apellido() {
    return this.formAdmin.controls['apellido'];
  }
  get edad() {
    return this.formAdmin.controls['edad'];
  }
  get dni() {
    return this.formAdmin.controls['dni'];
  }
  get email() {
    return this.formAdmin.controls['email'];
  }
  get clave() {
    return this.formAdmin.controls['clave'];
  }
  handleCaptchaSuccess(captchaResult: boolean) {
    if (captchaResult) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled =true;
    }
  }
}

