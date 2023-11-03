"use strict";(self.webpackChunkTPFinal_Labo_IV=self.webpackChunkTPFinal_Labo_IV||[]).push([[767],{767:(y,m,n)=>{n.r(m),n.d(m,{LoginModule:()=>S});var u=n(6814),o=n(6223),c=n(7488),d=n(3921),e=n(5879),h=n(2333),p=n(3712),g=n(5235),v=n(9255),f=n(5565),b=n(6890),C=n(953),Z=n(7290);const L=[{path:"",component:(()=>{class a{constructor(i,t,s,r,l,U){this.auth=i,this.snackBar=t,this.router=s,this.pacientesService=r,this.especialistaService=l,this.adminService=U,this.alerta="",this.hide=!0,this.loading=!1,this.formLogin=new o.cw({email:new o.NI(null,{validators:[o.kI.email],updateOn:"change"}),clave:new o.NI("",{validators:[o.kI.minLength(6)],updateOn:"change"})})}ngOnInit(){this.pacientesService.obtenerPacientes().subscribe(i=>{this.listaPacientes=i}),this.especialistaService.obtenerEspecialistas().subscribe(i=>{this.listaEspecialistas=i}),this.adminService.obtenerAdmins().subscribe(i=>{this.listaAdmins=i}),setTimeout(()=>{this.hide=!1},2500)}onSubmit(){this.formLogin.invalid||(this.hide=!0,this.auth.login(this.email.value,this.clave.value).then(i=>{let t=this.buscarUsuarioPorMailPassword(this.email.value);console.log(t),this.alerta=`Bienvenido ${this.email.value}`,this.snackBar.showSnackBar(this.alerta,"cerrar",5e3),"especialista"===t.tipo&&t.estados.registro===d.X.aceptado||"paciente"===t.tipo?this.router.navigate(["/bienvenida"]):"admin"===t.tipo?this.router.navigate(["/dashboard"]):this.snackBar.showSnackBar("error","cerrar",5e3),this.hide=!1,this.formLogin.reset()},i=>{this.hide=!1,"Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)."===i.message&&(this.alerta="Contrase\xf1a incorrecta vuelva a intentar"),"Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."===i.message&&(this.alerta="Usuario incorrecto vuelva a intentar"),"Firebase: Error (auth/invalid-login-credentials)."===i.message&&(this.alerta="Usuario invalido"),"Firebase: Error (auth/network-request-failed)."===i.message&&(this.alerta="Debe validar su cuenta"),this.snackBar.showSnackBar(this.alerta,"cerrar",5e3)}))}get email(){return this.formLogin.controls.email}get clave(){return this.formLogin.controls.clave}buscarUsuarioPorMailPassword(i){const t=this.listaPacientes.find(l=>l.email===i);if(t)return t;const s=this.listaEspecialistas.find(l=>l.email===i);return s||(this.listaAdmins.find(l=>l.email===i)||null)}autoComplete(i,t){this.formLogin.setValue({email:i,clave:t})}static#e=this.\u0275fac=function(t){return new(t||a)(e.Y36(h.e),e.Y36(p.o),e.Y36(c.F0),e.Y36(g.d),e.Y36(v.n),e.Y36(f.l))};static#i=this.\u0275cmp=e.Xpm({type:a,selectors:[["app-login"]],decls:30,vars:8,consts:[[3,"showSpinner"],[1,"container"],[1,"center-content"],["src","../../../../assets/logo.png","alt",""],[1,"header__navbar__logo"],["id","color",1,"header__navbar__logo__span--green"],[3,"formGroup","submit"],[1,"row"],[1,"col-md-12"],["divClass","mb-4","label","Email","controlName","email","type","mail"],[1,"invalid-feedback"],["divClass","mb-4","label","Clave","controlName","clave","type","password"],[1,"btn","btn-primary","position"],[1,"container-autologin","mt-3"],[1,"btn","btn-primary","btn-sm","rounded-circle",3,"click"],[1,"fa-solid","fa-user"],[1,"btn","btn-danger","btn-sm","rounded-circle",3,"click"],[1,"btn","btn-success","btn-sm","rounded-circle",3,"click"]],template:function(t,s){1&t&&(e._UZ(0,"app-navbar")(1,"app-spinner",0),e.TgZ(2,"div",1)(3,"div",2),e._UZ(4,"img",3)(5,"br"),e.TgZ(6,"a",4),e._uU(7,"On"),e.TgZ(8,"span",5),e._uU(9,"Line"),e.qZA()(),e.TgZ(10,"h2"),e._uU(11,"Ingrese con su cuenta"),e.qZA(),e.TgZ(12,"form",6),e.NdJ("submit",function(){return s.onSubmit()}),e.TgZ(13,"div",7)(14,"div",8)(15,"app-custom-input",9)(16,"small",10),e._uU(17,"Email invalido (solo letras)"),e.qZA()(),e.TgZ(18,"app-custom-input",11)(19,"small",10),e._uU(20,"Clave invalida"),e.qZA()()()(),e.TgZ(21,"button",12),e._uU(22,"Enviar"),e.qZA(),e.TgZ(23,"div",13)(24,"span",14),e.NdJ("click",function(){return s.autoComplete("juan.sueldo1989@gmail.com","123456")}),e._UZ(25,"i",15),e.qZA(),e.TgZ(26,"span",16),e.NdJ("click",function(){return s.autoComplete("juan.sueldo1989@gmail.com","123456")}),e._UZ(27,"i",15),e.qZA(),e.TgZ(28,"span",17),e.NdJ("click",function(){return s.autoComplete("juan.sueldo1989@gmail.com","123456")}),e._UZ(29,"i",15),e.qZA()()()()()),2&t&&(e.xp6(1),e.Q6J("showSpinner",s.hide),e.xp6(11),e.Q6J("formGroup",s.formLogin),e.xp6(3),e.Gre("form-control ",s.email.errors?"is-invalid":"",""),e.xp6(3),e.Gre("form-control ",s.clave.errors?"is-invalid":"",""))},dependencies:[o._Y,o.JL,o.sg,b.O,C.S,Z.O],styles:[".container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.center-content[_ngcontent-%COMP%]{margin-top:70px;width:50%;text-align:center}app-custom-input[_ngcontent-%COMP%]{padding:70px}img[_ngcontent-%COMP%]{height:100px;margin-bottom:20px}.invalid-feedback[_ngcontent-%COMP%]{padding:0;margin:0}.position[_ngcontent-%COMP%]{position:relative;width:100%}span[_ngcontent-%COMP%]{margin:10px}"]})}return a})()}];let T=(()=>{class a{static#e=this.\u0275fac=function(t){return new(t||a)};static#i=this.\u0275mod=e.oAB({type:a});static#t=this.\u0275inj=e.cJS({imports:[c.Bz.forChild(L),c.Bz]})}return a})();var P=n(6208);let S=(()=>{class a{static#e=this.\u0275fac=function(t){return new(t||a)};static#i=this.\u0275mod=e.oAB({type:a});static#t=this.\u0275inj=e.cJS({imports:[u.ez,T,o.UX,P.m]})}return a})()}}]);