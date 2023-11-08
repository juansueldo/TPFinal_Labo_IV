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
  this.validateEmptyInputs();
  this.loadingEvent.emit(true);
  if (this.form.invalid) {
    this.errorSnackbar("Faltan campos por completar");
   this.loadingEvent.emit(false);
    return;
  }
  const aux = this.nombre.value + ' ' + this.apellido.value;
  this.auth.register(this.email.value, this.clave.value).then( res =>{
    this.auth.confirmarMail(res)
    .then(responseMail => {
        console.log(responseMail);
    })
    .catch(errorMail =>{
      console.log(errorMail);
    });
    this.auth.updateUser({displayName:aux})
    let user={
      uid: res.user.uid,
      name: res.user.displayName,
      email: res.user.email,
    }
    if(this.tipoUsuario == 'paciente'){
      const paciente: Paciente = {
        id: user.uid,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        edad: Number(this.edad.value),
        dni: this.dni.value,
        email: this.email.value,
        obraSocial: this.obraSocial,
        img_1: this.imgUrl_1,
        img_2: this.imgUrl_2,
        tipo: 'paciente'
      }
      this.pacienteService.agregarPaciente(paciente).then((res) => {
        this.showSnackbar();
      }).catch(error=>{
        this.errorSnackbar(error);
      });
    }else if(this.tipoUsuario == 'especialista'){
      const especialista: Especialista = {
        id: user.uid,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        edad: Number(this.edad.value),
        dni: this.dni.value,
        email: this.email.value,
        especialidades: this.espcialidadSeleccionada,
        img_1: this.imgUrl_1,
        estados:  Registro.pendiente,
        tipo: 'especialista'
      };

      this.especialistasService.agregarEspecialista(especialista);
      this.showSnackbar();
    }else{
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
      this.adminService.agregarAdmin(admin);
      this.showSnackbar();
    }
 
  }).catch(error=>{
    this.errorSnackbar(error);
  });
  
}
showSnackbar(){
  this.alerta = `¡Bienvenido ${this.email.value}! Revise su casilla para válidar su cuenta.`;
  this.snackBar.showSnackBar(this.alerta, 'cerrar', 3500);
  this.router.navigate(['/bienvenida']);
  this.loadingEvent.emit(false);
  this.form.reset();
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

