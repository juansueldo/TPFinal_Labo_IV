import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PdfMakeWrapper, Img, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { HorarioEspecialista } from 'src/app/models/horario-especialista.models';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosEspecialistaService } from 'src/app/services/horarios-especialista.service';
import { HistoriaClinica } from 'src/app/models/historiaclinica.models';
import { NgZone } from '@angular/core';
import { MiVentanaModalComponent } from 'src/app/components/mi-ventana-modal/mi-ventana-modal.component';
import { MatDialog } from '@angular/material/dialog';
declare var window: any;
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit{
  // USUARIO 
  usuario:any;
  mostrar = false;
  mostrarPdf = false;
  loading = true;
  email = "";
  nombreCompleto = "";
  edad:number;
  dni:string;
  imagenes:string[] = ["",""];
  tipo:string;
  obraSocial:string;
  especialidades:string[] = [];
  especialidadesDisponibles:string[] = [];
  especialidadesPorDia:string[] = [];
  formModal: any;
  formModalPdf: any;
  popUpRazon = "";
  historiaPaciente;
  disponibilidades = ["Habilitado","Habilitado","Habilitado","Habilitado","Habilitado","Habilitado"];
  especialidadPDFseleccionada = "";

  diasDisponibles = [{dia:"Lunes", ini: "", fin: ""},{dia:"Martes", ini: "", fin: ""},{dia:"Miercoles", ini: "", fin: ""},
    {dia:"Jueves", ini: "", fin: ""},{dia:"Viernes", ini: "", fin: ""},{dia:"Sabado", ini: "", fin: ""}];
  horariosDisponibles = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  horariosEspecialista:HorarioEspecialista;
  historias:HistoriaClinica[] = [];
  historiasDelPaciente:HistoriaClinica[] = [];

  constructor(private usuarioService:UsuariosService,
    private data:DataService, 
    private especialidadesService: EspecialidadesService,
    private horarioEspecialistaService: HorariosEspecialistaService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.formModalPdf = new window.bootstrap.Modal(
      document.getElementById('pdfModal')
    );
    setTimeout(()=>{
      this.loading = false;
    },2500);
    
    this.usuario = this.usuarioService.getUsuario();
    
    this.horarioEspecialistaService.getHorarioEspecialistas().subscribe(horario => {
      horario.forEach(hor => {
        console.log(hor);
        if(this.usuario.email == hor.email){
          this.horariosEspecialista = hor;
          this.disponibilidades = this.horariosEspecialista.estados;
          this.especialidadesPorDia = this.horariosEspecialista.especialidadesPorDia;
          this.cargarHorarios(hor);
        }
      });
    });
    this.especialidadesService.obtenerEspecialidades().subscribe(esp => {
      this.especialidadesDisponibles = (esp as any[]).map(e => e.nombre);
    });
    
    this.data.getHistoriaDB().subscribe(historias => {
 
    historias.forEach(historia=>{
     
      if(this.usuario.email === historia.paciente){
        this.historiaPaciente = historia;
        console.log(this.historiaPaciente);
      }
    })
    });
   
  }
  
  ngAfterViewInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.completarCampos();
  }
  completarCampos(){
    this.email = this.usuario.email;
    this.nombreCompleto = this.usuario.nombre + " " + this.usuario.apellido;
    this.edad = this.usuario.edad;
    this.dni = this.usuario.dni;
    this.tipo = this.usuario.tipo;
    if(this.tipo == 'paciente'){
      this.imagenes[0] = this.usuario.img_1;
      this.imagenes[1] = this.usuario.img_2;
      this.obraSocial = this.usuario.obraSocial;
    }
    else if(this.tipo == 'especialista'){
      this.especialidades = this.usuario.especialidades;
      // this.especialidadesAux = [this.especialidades[0],this.especialidades[0],
      //   this.especialidades[0],this.especialidades[0],this.especialidades[0],this.especialidades[0]];
      this.imagenes[0] = this.usuario.img_1;
    }
    else{
      this.imagenes[0] = this.usuario.img_1;
    }
  }

  cargarHorarios(horario:HorarioEspecialista){
    this.diasDisponibles[0].ini = horario.lunInicio;
    this.diasDisponibles[0].fin = horario.lunFin;
    this.diasDisponibles[1].ini = horario.marInicio;
    this.diasDisponibles[1].fin = horario.marFin;
    this.diasDisponibles[2].ini = horario.mierInicio;
    this.diasDisponibles[2].fin = horario.mierFin;
    this.diasDisponibles[3].ini = horario.jueInicio;
    this.diasDisponibles[3].fin = horario.jueFin;
    this.diasDisponibles[4].ini = horario.vierInicio;
    this.diasDisponibles[4].fin = horario.vierFin;
    this.diasDisponibles[5].ini = horario.sabInicio;
    this.diasDisponibles[5].fin = horario.sabFin;
  }

  abrirPopUpFiltrarPdf(razon:string){
    this.popUpRazon = razon;
    this.formModalPdf.show();
  }

  seleccionarEspecialidad(esp:string){
    this.especialidadPDFseleccionada = esp;
  }
  obtenerHistoriasPaciente(){
    this.data.getHistoriaDB().subscribe(historias => {
      historias.forEach(historia=>{
        if(historia.paciente === this.usuario.email){
          this.historiasDelPaciente.push(historia);
        }
      })
  });
  }
  async imprimirPdf(){
    this.obtenerHistoriasPaciente();
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    const logo = await new Img('../../../assets/logo.png').absolutePosition(30,20).fit([40,40]).build();


    pdf.add([logo, new Txt('Clinica OnLine').color('gray').absolutePosition(73,35).fontSize(15).italics().end]);
    pdf.add('\n');
    pdf.add(new Txt('Historia Clínica').decoration('underline').alignment('center').fontSize(20).bold().end);
    pdf.add(new Txt(['\n\n',new Txt('Paciente: ').bold().end,' '+this.usuario.nombre + " " + this.usuario.apellido]).end);
    let hoy = new Date();
    pdf.add(new Txt(['', new Txt('Fecha: ').bold().end, ' ', hoy.getDate().toString(), '/', (hoy.getMonth() + 1).toString(), '/', hoy.getFullYear().toString()]).end);

    
    pdf.add("\n\n");

      this.historiasDelPaciente.forEach(historiaPaciente=>{
        pdf.add("Altura: " +  historiaPaciente.altura);
        pdf.add("Peso: " +  historiaPaciente.peso);
        pdf.add("Temperatura: " +   historiaPaciente.temperatura);
        pdf.add("Presion: " +   historiaPaciente.presion);
        pdf.add("Especialidad: " +  historiaPaciente.especialidad);
        historiaPaciente.dinamicos.forEach(dinamico => {
          pdf.add(dinamico.clave + ": " + dinamico.valor);
        });
        pdf.add("\n");
      })
       
 
    pdf.create().download("historiaClinica");
    pdf.create().open();

    this.especialidadPDFseleccionada = "";
  }

  cambiarHorario(dia:string,tipo:string,horario:string){
    if(tipo == "inicio"){
      switch(dia){
        case "Lunes":
          this.diasDisponibles[0].ini = horario;
          break;
        case "Martes":
          this.diasDisponibles[1].ini = horario;
          break;
        case "Miercoles":
          this.diasDisponibles[2].ini = horario;
          break;
        case "Jueves":
          this.diasDisponibles[3].ini = horario;
          break;
        case "Viernes":
          this.diasDisponibles[4].ini = horario;
          break;
        case "Sabado":
          this.diasDisponibles[5].ini = horario;
          break;
      }
    }
    else{
      switch(dia){
        case "Lunes":
          this.diasDisponibles[0].fin = horario;
          break;
        case "Martes":
          this.diasDisponibles[1].fin = horario;
          break;
        case "Miercoles":
          this.diasDisponibles[2].fin = horario;
          break;
        case "Jueves":
          this.diasDisponibles[3].fin = horario;
          break;
        case "Viernes":
          this.diasDisponibles[4].fin = horario;
          break;
        case "Sabado":
          this.diasDisponibles[5].fin = horario;
          break;
      }
    }
  }

  cambiarEstado(dia:string, estadoAnterior:string){
    if(estadoAnterior == "Habilitado"){
      estadoAnterior = "Inhabilitado";
    }
    else{
      estadoAnterior = "Habilitado";
    }
    switch(dia){
      case "Lunes":
        this.horariosEspecialista.estados[0] = estadoAnterior;
        break;
      case "Martes":
        this.horariosEspecialista.estados[1] = estadoAnterior;
        break;
      case "Miercoles":
        this.horariosEspecialista.estados[2] = estadoAnterior;
        break;
      case "Jueves":
        this.horariosEspecialista.estados[3] = estadoAnterior;
        break;
      case "Viernes":
        this.horariosEspecialista.estados[4] = estadoAnterior;
        break;
      case "Sabado":
        this.horariosEspecialista.estados[5] = estadoAnterior;
        break;
    }
  }

  cambiarEspecialidad(dia:string,especialidad:string){
    switch(dia){
      case "Lunes":
        this.especialidadesPorDia[0] = especialidad;
        break;
      case "Martes":
        this.especialidadesPorDia[1] = especialidad;
        break;
      case "Miercoles":
        this.especialidadesPorDia[2] = especialidad;
        break;
      case "Jueves":
        this.especialidadesPorDia[3] = especialidad;
        break;
      case "Viernes":
        this.especialidadesPorDia[4] = especialidad;
        break;
      case "Sabado":
        this.especialidadesPorDia[5] = especialidad;
        break;
    }
  }

  abrirMisHorarios(){
    this.mostrar = true;
  }

  actualizarHorarioEspecialista(){
    this.horariosEspecialista.lunInicio = this.diasDisponibles[0].ini;
    this.horariosEspecialista.lunFin = this.diasDisponibles[0].fin;
    this.horariosEspecialista.marInicio = this.diasDisponibles[1].ini;
    this.horariosEspecialista.marFin = this.diasDisponibles[1].fin;
    this.horariosEspecialista.mierInicio = this.diasDisponibles[2].ini;
    this.horariosEspecialista.mierFin = this.diasDisponibles[2].fin;
    this.horariosEspecialista.jueInicio = this.diasDisponibles[3].ini;
    this.horariosEspecialista.jueFin = this.diasDisponibles[3].fin;
    this.horariosEspecialista.vierInicio = this.diasDisponibles[4].ini;
    this.horariosEspecialista.vierFin = this.diasDisponibles[4].fin;
    this.horariosEspecialista.sabInicio = this.diasDisponibles[5].ini;
    this.horariosEspecialista.sabFin = this.diasDisponibles[5].fin;
  }

  cerrarModulo(){
    this.actualizarHorarioEspecialista();
    this.horarioEspecialistaService.updateHorarioEspecialistas(this.horariosEspecialista);
    this.mostrar = false;
  }
  abrirVentanaModal(): void {
    const dialogRef = this.dialog.open(MiVentanaModalComponent, {
      width: '700px',
      height: '500px',
      data: { emailPaciente: this.usuario.email },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La ventana modal se cerró', result);
      // Puedes realizar acciones después de cerrar la ventana modal si es necesario
    });
  }
}