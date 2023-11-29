import { Component, EventEmitter,Inject, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/models/interfaces.models';
import { Turno } from 'src/app/models/turno.models';
import { DataService } from 'src/app/services/data.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfMakeWrapper, Img, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-mi-ventana-modal',
  templateUrl: './mi-ventana-modal.component.html',
  styleUrls: ['./mi-ventana-modal.component.scss']
})
export class MiVentanaModalComponent implements OnInit {
  emailPaciente: string = '';
  usuario:any;
  especialidades: Especialidad[] = [];
  turnos: Turno[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private usuarioService:UsuariosService,
  private especialidadService: EspecialidadesService,
  private dataService: DataService,
  private snackBar: SnackbarService){
    this.emailPaciente = data.emailPaciente;
  }
  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.especialidadService.obtenerEspecialidades().subscribe((data: any[]) => {
      this.especialidades = data.map(especialidad => especialidad.nombre);
    });
    this.dataService.getTurnosDB().subscribe(turnos=>{
      this.turnos = turnos;
    })
  }
  descargarAtenciones(especialidad: any): Turno[] | null {
    let turnosMostrar: Turno[] = [];
    this.turnos.forEach(turno => {
      if (turno.paciente == this.emailPaciente && turno.especialidad == especialidad) {
        turnosMostrar.push(turno);
      }
    });
  
    return turnosMostrar.length > 0 ? turnosMostrar : null;
  }
  
  async imprimirPdf(especialidad: any){
    let atenciones: Turno[] | null = this.descargarAtenciones(especialidad);

    if (atenciones === null) {
      this.snackBar.showSnackBar("No hay atenciones disponibles", 'cerrar', 5000, false);
      console.error('No hay atenciones disponibles.');
      return;
    }
     PdfMakeWrapper.setFonts(pdfFonts);
     const pdf = new PdfMakeWrapper();
     const logo = await new Img('../../../assets/logo.png').absolutePosition(30,20).fit([40,40]).build();
 
 
     pdf.add([logo, new Txt('Clinica OnLine').color('gray').absolutePosition(73,35).fontSize(15).italics().end]);
     pdf.add('\n');
     pdf.add(new Txt('Turnos').decoration('underline').alignment('center').fontSize(20).bold().end);
     pdf.add(new Txt(['\n\n',new Txt('Paciente: ').bold().end,' '+this.usuario.nombre + " " + this.usuario.apellido]).end);
     let hoy = new Date();
     pdf.add(new Txt(['', new Txt('Fecha: ').bold().end, ' ', hoy.getDate().toString(), '/', (hoy.getMonth() + 1).toString(), '/', hoy.getFullYear().toString()]).end);
 
     
     pdf.add("\n\n");
 
        atenciones.forEach(atencion=>{
          pdf.add("Especialidad: " + atencion.especialidad);
          const especialista = this.usuarioService.buscarUsuarioPorMail(atencion.especialista);
          pdf.add(`Especialista: ${especialista.nombre} ${especialista.apellido}` );
          pdf.add("Estado: " + atencion.estado);
          pdf.add(`Fecha del turno: ${atencion.dia} de ${atencion.mes} del ${atencion.anio} a las ${atencion.hora}hs`);
          atencion.fecha !== "" ? pdf.add(`Finalizado: ${atencion.fecha}`) : "";
          atencion.comentario !== "" ? pdf.add(`Observaciones: ${atencion.comentario}`) : "";
          pdf.add("\n");
        })
         
  
     pdf.create().download("atenciones");
     pdf.create().open();
 
    
   }
}
