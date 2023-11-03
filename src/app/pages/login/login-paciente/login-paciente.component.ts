import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente.models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { Especialista, Registro } from 'src/app/models/especialista.models';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/admin.models';

@Component({
  selector: 'app-login-paciente',
  templateUrl: './login-paciente.component.html',
  styleUrls: ['./login-paciente.component.scss']
})
export class LoginPacienteComponent implements OnInit{
  formLogin: FormGroup;
  alerta: string = '';
  hide = true;
  loading = false;
  listaPacientes;
  listaEspecialistas;
  listaAdmins;
  pacientes:Paciente[];
  especialistas:Especialista[];
  constructor(
    private auth: AuthService,
    private snackBar: SnackbarService,
    private router: Router,
    private pacientesService: PacienteService,
    private especialistaService: EspecialistasService,
    private adminService: AdminService
    ){
    this.formLogin = new FormGroup({
   
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
    this.pacientesService.obtenerPacientes().subscribe(posts => {
      this.listaPacientes = posts;
    });
    this.especialistaService.obtenerEspecialistas().subscribe(posts => {
      this.listaEspecialistas = posts;
    });
    this.adminService.obtenerAdmins().subscribe(posts => {
      this.listaAdmins = posts;
    });
 
  }
  onSubmit(){
    if (this.formLogin.invalid){
      return;
    }
      this.loading = true;
      //const date = new Date();
      //const fullDate = date.toLocaleDateString() + '-' + date.toLocaleTimeString();
      this.auth.login(this.email.value, this.clave.value).then(res =>{
      
      let user =  this.buscarUsuarioPorMailPassword(this.email.value);
        this.alerta = `Bienvenido ${this.email.value}`;
        //this.auth.saveLog(this.email);
        this.snackBar.showSnackBar(this.alerta, 'cerrar', 5000);
        if(user.tipo === 'especialista' && user.estado.registro === Registro.aceptado){
         //this.router.navigate(['/bienvenida']);
        }
        else if(user.tipo === 'paciente'){
          //this.router.navigate(['/bienvenida']);
        }
        else if(user.tipo === 'admin'){
         // this.router.navigate(['/dashboard']);
        }
        else{
          this.snackBar.showSnackBar('error', 'cerrar', 5000);
        }
        

        this.formLogin.reset();
      }, error =>{
        this.loading = false;
        console.log(error.message);
        if(error.message === "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
          this.alerta = "Contraseña incorrecta vuelva a intentar";
        }
        if(error.message ==="Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
          this.alerta = "Usuario incorrecto vuelva a intentar";
        }
        if(error.message === "Firebase: Error (auth/invalid-login-credentials)."){
          this.alerta = "Usuario invalido";
        }
        if(error.message === "Firebase: Error (auth/network-request-failed)."){
          this.alerta = "Debe validar su cuenta";
        }
        this.snackBar.showSnackBar(this.alerta, 'cerrar', 5000);
      })
  }
  get email() {
    return this.formLogin.controls['email'];
  }
  get clave() {
    return this.formLogin.controls['clave'];
  }
  buscarUsuarioPorMailPassword(email:any){
    let usuario = null;    
    this.listaPacientes.forEach(paciente => {
      if(paciente.email == email ){
        usuario = paciente as Paciente;
       
      }
    });
    this.listaEspecialistas.forEach(especialista => {
      if(especialista.email == email){
        usuario = especialista as Especialista;
      }
    });
    this.listaAdmins.forEach(admin => {
      if(admin.mail == email){
        usuario = admin as Admin;
      }
    });
    console.log(usuario);
    return usuario;
  }

}
