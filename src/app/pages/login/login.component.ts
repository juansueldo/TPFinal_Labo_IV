import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.models';
import { Especialista, Registro } from 'src/app/models/especialista.models';
import { Paciente } from 'src/app/models/paciente.models';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistasService } from 'src/app/services/especialistas.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LogIngreso } from 'src/app/models/log-ingreso';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('600ms ease', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('600ms ease', style({ transform: 'translateY(-100%)' })),
      ]),
    ])
  ]
})
export class LoginComponent {
  user: any;
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
    private adminService: AdminService,
    private usuariosService: UsuariosService,
    private data: DataService
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
    setTimeout(()=>{
      this.hide = false;
    },2500);
 
    this.cargarUsuario();
  }
  cargarUsuario() {
    this.user = this.usuariosService.getUsuario();
  }
  onSubmit(){
    if (this.formLogin.invalid){
      this.snackBar.showSnackBar("Debe completar los datos", 'cerrar', 5000, false);
      return;
    }
      this.hide = true;
      //const date = new Date();
      //const fullDate = date.toLocaleDateString() + '-' + date.toLocaleTimeString();
      this.auth.login(this.email.value, this.clave.value).then(res =>{
        let now = new Date();
        let fecha = now.getDate().toString()+"/"+(now.getMonth()+1).toString()+"/"+now.getFullYear().toString();
        let hora = now.getHours().toString()+":"+this.formatoMinutos(now.getMinutes());
        this.data.cargarLogIngresos(new LogIngreso(this.email.value,fecha,hora));
      let user =  this.usuariosService.buscarUsuarioPorMail(this.email.value);
      console.log(user);
        this.alerta = `Bienvenido ${user.nombre} ${user.apellido}`;
        //this.auth.saveLog(this.email);
        this.snackBar.showSnackBar(this.alerta, 'cerrar', 5000, true);
        if(this.auth.autha.currentUser.emailVerified){
          if(user.tipo === 'paciente'){
            this.usuariosService.setUsuario(user.tipo, user);
            this.router.navigate(['/login/mi-perfil']);
          }
          else if(user.tipo === 'admin'){
            this.usuariosService.setUsuario(user.tipo, user);
            this.router.navigate(['/login/seccion-usuarios']);
          }
          else if(user.tipo === 'especialista'){
            if(user.estados.registro == Registro.aceptado){
              this.usuariosService.setUsuario(user.tipo, user);
              this.router.navigate(['/login/mi-perfil']);
            }
            else{
              this.snackBar.showSnackBar('Su cuenta esta pendiente de aprobación', 'cerrar', 5000, false);
            }
          }
          else{
            this.snackBar.showSnackBar('Ocurrió un error al ingresar, intente nuevamente', 'cerrar', 5000, false);
          }
         
        }
        else{
          this.snackBar.showSnackBar('Debe confirmar su cuenta.', 'cerrar', 5000, false);
        }
       
        
        this.hide = false;
        this.formLogin.reset();
      }, error =>{
        this.hide = false;
        if(error.message === "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."){
          this.alerta = "Contraseña incorrecta vuelva a intentar";
        }
        if(error.message ==="Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
          this.alerta = "Usuario incorrecto vuelva a intentar";
        }
        if(error.message === "Firebase: Error (auth/invalid-login-credentials)."){
          this.alerta = "Usuario y/o contraseña inválida";
        }
        if(error.message === "Firebase: Error (auth/network-request-failed)."){
          this.alerta = "Debe validar su cuenta";
        }
        this.snackBar.showSnackBar(this.alerta, 'cerrar', 5000, false);
      })
  }
  get email() {
    return this.formLogin.controls['email'];
  }
  get clave() {
    return this.formLogin.controls['clave'];
  }
  autoComplete(email:any, clave:any){
    this.formLogin.setValue({
      email: email,
      clave: clave
    });
  }
  mostrarFoto(email: string){
    return this.usuariosService.buscarUsuarioPorMail(email).img_1;
  }
  formatoMinutos(minutos:number){
    if(minutos < 10){
      return "0" + minutos;
    }
    return minutos.toString();
  }
}