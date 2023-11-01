import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente.models';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-paciente',
  templateUrl: './login-paciente.component.html',
  styleUrls: ['./login-paciente.component.scss']
})
export class LoginPacienteComponent {
  formLogin: FormGroup;
  alerta: string = '';
  hide = true;
  loading = false;
  constructor(private auth: AuthService, private snackBar: MatSnackBar, public router: Router){
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
  onSubmit(){
    if (this.formLogin.valid) {
      this.loading = true;
      const date = new Date();
      const fullDate = date.toLocaleDateString() + '-' + date.toLocaleTimeString();
      this.auth.login(this.email, this.clave).then(async res =>{
        let user: Paciente={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
        this.alerta = `Bienvenido ${user.email}`;
        //this.auth.saveLog(this.email);
        let sb = this.snackBar.open(this.alerta, 'cerrar', {
          duration: 3000,
        });
        sb.onAction().subscribe(() => {
          sb.dismiss();
        });
        this.router.navigate(['bienvenido'], { queryParams: user });
        

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
        let sb = this.snackBar.open(this.alerta, 'cerrar', {
          duration: 5000,
        });
        sb.onAction().subscribe(() => {
          sb.dismiss();
        });
      })
    }
  }
   get email() {
    return this.formLogin.controls['email'];
  }
  get clave() {
    return this.formLogin.controls['clave'];
  }

}
