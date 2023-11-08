import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.models';
import { Especialista, Registro } from 'src/app/models/especialista.models';
import { Especialidad, ObraSocial } from 'src/app/models/interfaces.models';
import { Paciente } from 'src/app/models/paciente.models';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { ImgService } from 'src/app/services/img.service';
import { ObrasocialService } from 'src/app/services/obrasocial.service';
import { PacienteService } from 'src/app/services/paciente.service';
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
  usuario: any;
  obraSocial: string;
  nombreCompleto: string;
  constructor(
    private img: ImgService, 
    private especialistasService: EspecialistasService,
    private pacienteService: PacienteService,
    private adminService: AdminService,
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
    foto: new FormControl('',{
      validators: [FormValidator.validateFileType(['jpg', 'jpeg', 'png'])],
      updateOn: 'change',
    })
  });
}
ngOnInit(): void {
  this.obraSocialService.obtenerObrasSociales().subscribe(posts => {
    this.listadoObraSocial = posts;
  });
}
handleSelected(selectedObraSocial: string){
  this.obraSocial = selectedObraSocial;
}
handleItemSelected(selectedItems: Especialidad[]) {
  this.espcialidadSeleccionada = selectedItems;
}
onSubmit() {
  this.validateForm();
}

async registerUser() {
  try {
    const res = await this.auth.register(this.form.value.email, this.form.value.clave);
    await this.auth.confirmarMail(res);

    return res.user;
  } catch (error) {
    throw error;
  }
}

async updateUserInfo(user) {
  this.nombreCompleto = this.form.value.nombre + ' ' + this.form.value.apellido;

  await this.auth.updateUser({ displayName: this.nombreCompleto  });

  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
  };
}

async handlePacienteRegistration(user) {
  const paciente: Paciente = {
    id: user.uid,
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    edad: Number(this.form.value.edad),
    dni: this.form.value.dni,
    email: this.form.value.email,
    obraSocial: this.obraSocial,
    img_1: this.imgUrl_1,
    img_2: this.imgUrl_2,
    tipo: 'paciente',
  };

  await this.pacienteService.agregarPaciente(paciente);
}

async handleEspecialistaRegistration(user) {
  const especialista: Especialista = {
    id: user.uid,
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    edad: Number(this.form.value.edad),
    dni: this.form.value.dni,
    email: this.form.value.email,
    especialidades: this.espcialidadSeleccionada,
    img_1: this.imgUrl_1,
    estados: {
      registro: Registro.pendiente,
    },

    tipo: 'especialista',
  };

  await this.especialistasService.agregarEspecialista(especialista);
}

async handleAdminRegistration(user) {
  const admin: Admin = {
    id: user.uid,
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    edad: Number(this.form.value.edad),
    dni: this.form.value.dni,
    email: this.form.value.email,
    img_1: this.imgUrl_1,
    tipo: 'admin',
  };

  await this.adminService.agregarAdmin(admin);
}

showSnackbar() {
  this.alerta = `¡Bienvenido ${this.nombreCompleto }! Revise su casilla para validar su cuenta.`;
  this.snackBar.showSnackBar(this.alerta, 'cerrar', 3500);
  this.router.navigate(['/bienvenida']);
  this.loadingEvent.emit(false);
  this.form.reset();
}

async validateForm() {
  this.validateEmptyInputs();
  this.loadingEvent.emit(true);

  if (this.form.invalid) {
    this.errorSnackbar("Faltan campos por completar");
    this.loadingEvent.emit(false);
    return;
  }

  try {
    const user = await this.registerUser();
    const userInfo = await this.updateUserInfo(user);

    if (this.tipoUsuario === 'paciente') {
      await this.handlePacienteRegistration(user);
    } else if (this.tipoUsuario === 'especialista') {
      await this.handleEspecialistaRegistration(user);
    } else {
      await this.handleAdminRegistration(user);
    }

    this.showSnackbar();
  } catch (error) {
    this.errorSnackbar(error);

    // Si falla el registro, no ejecutar funciones adicionales
    return;
  }
}


errorSnackbar(mensaje: string){
  this.snackBar.showSnackBar(mensaje, 'cerrar', 3500);
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
  get foto() {
    return this.form.controls['foto'];
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
  subirFoto(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.img.uploadImage(file, 'imagenes/' + file.name).subscribe(url => {
        this.imgUrl_1 = url;
      });
    }
  }
}


