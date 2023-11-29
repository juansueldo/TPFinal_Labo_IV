import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Chart, ChartType, ChartTypeRegistry, TooltipItem, registerables } from 'chart.js/auto';
import { PdfMakeWrapper, Img, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as XLSX from 'xlsx';
import { LogIngreso } from '../../models/log-ingreso';
import { Especialista } from '../../models/especialista.models';
import { Turno } from '../../models/turno.models';
Chart.register(...registerables);
declare var window: any;
import { UsuariosService } from '../../services/usuarios.service';
import { DataService } from '../../services/data.service';
import { EspecialistasService } from '../../services/especialistas.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  @ViewChild('content') content!: ElementRef;
  @ViewChildren('canvasElement') canvasElements: QueryList<ElementRef<HTMLCanvasElement>>;
  especialistas:Especialista[] = [];
  especialistasNombres:string[] = [];
  logIngresos:LogIngreso[] = [];
  cargarPdf = false;
  dias:string[] = [];
  diasPorTurno:number[] = [];
  turnosPorEspecialidad:number[] = [];
  turnosSolicitadosPorFecha:number[] = [];
  turnosFinalizadosPorFecha:number[] = [];
  especialidades:string[] = [];
  colores:string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  backgroundColor: string[] =[
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];
  borderColor:string[] = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];
  turnos:Turno[] = [];
  @ViewChild('content', {static:true}) el!: ElementRef<HTMLImageElement>;
  formModal: any;
  popUpMomento = "";
  fechaInicioStr = "";
  fechaFinStr = "";
  diaInicio:number;
  diaFin:number;
  fechaInicio:Date;
  fechaFin:Date;
  fechaElegidaAux:Date;
  estadoBoton = false;
  user: any;

  constructor(private usuariosService:UsuariosService,
    private data:DataService,
    private especialistasService: EspecialistasService,
    private especialidadesService: EspecialidadesService,
    private usuarioService: UsuariosService){}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('pdfModal')
    );

    this.especialistasService.obtenerEspecialistas().subscribe(esp => {
      this.cargarNombreEspecialistas();

    });
    this.data.getLogIngresos().subscribe(log => {
      this.logIngresos = log;
      this.logIngresos.sort(this.ordenarLogs);
      if(this.logIngresos.length > 30){
        this.logIngresos = [...this.logIngresos].slice(0, 30);
      }

    });
    this.especialidadesService.obtenerEspecialidades().subscribe((data: any[]) => {
      this.especialidades = data.map(especialidad => especialidad.nombre);
    });
    this.especialistasService.obtenerEspecialistas().subscribe(esp=>{
      this.especialistas = esp;
    });
    this.data.getTurnosDB().subscribe(turnos => {
      this.turnos = turnos;
    });
    this.cargarUsuario();
  }
  cargarUsuario() {
    this.user = this.usuarioService.getUsuario();
  }
  ngAfterViewInit() {
    this.cargarNombreEspecialistas();
  }

  recibiRespuesta(fecha: Date, estado:string) {
    this.fechaElegidaAux = fecha;
    this.elegirFecha(estado);
    this.cerrarPopUp();
  }

  contarTurnosSolicitadosPorFecha(){
    this.especialistas.forEach(esp => {
      let cantidad = 0;
      this.turnos.forEach(turno => {
        if(this.evaluarFechas(this.fechaInicio.getDate(),(this.fechaInicio.getMonth()+1),this.fechaInicio.getFullYear(),
        Number(turno.dia),this.cambiarMesNumero(turno.mes),Number(turno.anio)) == "menor" && 
        this.evaluarFechas(this.fechaFin.getDate(),(this.fechaFin.getMonth()+1),this.fechaFin.getFullYear(),
        Number(turno.dia),this.cambiarMesNumero(turno.mes),Number(turno.anio)) == "mayor"){
          if(turno.especialista == esp.email){
            cantidad++;
          }
        }
      });
      this.turnosSolicitadosPorFecha.push(cantidad);
    })
  }

  cambiarMesNumero(mes:string){
    switch(mes){
      case "Enero":
        return 1;
      case "Febrero":
        return 2;
      case "Marzo":
        return 3;
      case "Abril":
        return 4;
      case "Mayo":
        return 5;
      case "Junio":
        return 6;
      case "Julio":
        return 7;
      case "Agosto":
        return 8;
      case "Septiembre":
        return 9;
      case "Octubre":
        return 10;
      case "Noviembre":
        return 11;
      case "Diciembre":
        return 12;
    }
    return -1;
  }

  contarTurnosFinalizadosPorFecha(){
    this.especialistas.forEach(esp => {
      let cantidad = 0;
      this.turnos.forEach(turno => {
        if(this.evaluarFechas(this.fechaInicio.getDate(),(this.fechaInicio.getMonth()+1),this.fechaInicio.getFullYear(),
        Number(turno.dia),this.cambiarMesNumero(turno.mes),Number(turno.anio)) == "menor" && 
        this.evaluarFechas(this.fechaFin.getDate(),(this.fechaFin.getMonth()+1),this.fechaFin.getFullYear(),
        Number(turno.dia),this.cambiarMesNumero(turno.mes),Number(turno.anio)) == "mayor"){
          if(turno.especialista == esp.email && turno.estado == "finalizado"){
            cantidad++;
          }
        }
      });
      this.turnosFinalizadosPorFecha.push(cantidad);
    })
  }

  contarTurnosPorDias(){
    let diaAux = "";
    this.dias.forEach(dia => {
      let cantidad = 0;
      this.turnos.forEach(turno => {
        diaAux = turno.dia + '/' + this.cambiarMesNumero(turno.mes) + '/' + turno.anio;
        if(diaAux == dia){
          cantidad++;
        }
      });
      this.diasPorTurno.push(cantidad);
    });
  }

  abrirPopUp(momento:string){
    this.popUpMomento = momento;
    this.formModal.show();
  }

  elegirFecha(momento:string){
    let fechaAux = this.fechaElegidaAux.getDate() + "/" + (this.fechaElegidaAux.getMonth()+1) + "/" + this.fechaElegidaAux.getFullYear();
    if(momento == "inicio"){
      this.fechaInicioStr = fechaAux;
      this.diaInicio = this.fechaElegidaAux.getDay();
      this.fechaInicio = this.fechaElegidaAux;
    }
    else{
      this.fechaFinStr = fechaAux;
      this.diaFin = this.fechaElegidaAux.getDay();
      this.fechaFin = this.fechaElegidaAux;
    }
    if(this.fechaInicioStr != "" && this.fechaFinStr != ""){
      this.estadoBoton = true;
    }
  }
  
  cerrarPopUp(){
    this.formModal.hide();
  }

  cargarDias(){
    let diaAux = "";
    this.turnos.filter(value => {
      diaAux = value.dia + '/' + this.cambiarMesNumero(value.mes) + '/' + value.anio;
      if(!this.dias.some(x => x == diaAux)){
        this.dias.push(diaAux);
      }
    });
    if(this.dias.length > 6){
      this.dias = [...this.dias].slice(0, 5);
    }
    this.dias.sort(this.ordenarDias);
    this.contarTurnosPorDias();
  }

  contarTurnosPorEspecialidad(){
    this.especialidades.forEach(esp => {
      let cantidad = 0;
      this.turnos.forEach(turno => {
        if(turno.especialidad == esp){
          cantidad++;
        }
      });
      this.turnosPorEspecialidad.push(cantidad);
    });
  }

  cargarNombreEspecialistas(){
    this.usuariosService.especialistas.forEach(esp => {
      this.especialistasNombres.push(esp.nombre + " " + esp.apellido);
    });
  }

  ordenarDias(dia1:string,dia2:string){
    let diaSplit1 = dia1.split("/");
    let diaSplit2 = dia2.split("/");
    
    if(diaSplit1 == diaSplit2){
      return 0;
    }
    if(Number(diaSplit1[2]) > Number(diaSplit2[2])){
      return 1;
    }
    else if(Number(diaSplit1[2]) == Number(diaSplit2[2]) && Number(diaSplit1[1]) > Number(diaSplit2[1])){
      return 1;
    }
    else if(Number(diaSplit1[2]) == Number(diaSplit2[2]) && Number(diaSplit1[1]) == Number(diaSplit2[1]) && Number(diaSplit1[0]) > Number(diaSplit2[0])){
      return 1;
    }
    
    return -1;
  }

  ordenarLogs(log1:LogIngreso,log2:LogIngreso){
    let diaSplit1 = log1.dia.split("/");
    let diaSplit2 = log2.dia.split("/");
    let horaSplit1 = log1.hora.split(":");
    let horaSplit2 = log2.hora.split(":");
    if(log1.hora == log2.hora && log1.dia == log2.dia){
      return 0;
    }
    if(Number(diaSplit1[2]) > Number(diaSplit2[2])){
      return -1;
    }
    else if(Number(diaSplit1[2]) == Number(diaSplit2[2]) && Number(diaSplit1[1]) > Number(diaSplit2[1])){
      return -1;
    }
    else if(Number(diaSplit1[2]) == Number(diaSplit2[2]) && Number(diaSplit1[1]) == Number(diaSplit2[1]) && Number(diaSplit1[0]) > Number(diaSplit2[0])){
      return -1;
    }
    else if(Number(diaSplit1[2]) == Number(diaSplit2[2]) && Number(diaSplit1[1]) == Number(diaSplit2[1]) && Number(diaSplit1[0]) == Number(diaSplit2[0]) && 
    Number(horaSplit1[0]) > Number(horaSplit2[0])){
      return -1;
    }
    else if(Number(diaSplit1[2]) == Number(diaSplit2[2]) && Number(diaSplit1[1]) == Number(diaSplit2[1]) && Number(diaSplit1[0]) == Number(diaSplit2[0]) && 
    Number(horaSplit1[0]) == Number(horaSplit2[0]) && Number(horaSplit1[1]) > Number(horaSplit2[1])){
      return -1;
    }
    
    return 1;
  }

  grafico(){
    const ctx = new Chart("especialidades", {
      type: 'pie',
      data: {
        labels: this.especialidades,
        datasets: [{
          label: 'Turnos',
          data: this.turnosPorEspecialidad,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }]
      },
      options: {
        
      }
    });
  }
  grafico1() {
    const userStats: { [usuario: string]: { index: number; count: number } } = {};
    const usuariosFormateados = this.logIngresos.map((log, index) => {
      const usuarioInfo = userStats[log.usuario];
      if (usuarioInfo) {
        usuarioInfo.count += 1;
      } else {
        userStats[log.usuario] = { index: index + 1, count: 1 };
      }
      return { index: userStats[log.usuario].index, usuario: log.usuario, count: userStats[log.usuario].count };
    });
  
    const fechaHora = this.logIngresos.map(item => {
      const fechaHoraString = `${item.dia} ${item.hora}`;
      return fechaHoraString;
    });
  
    const data = {
      labels: fechaHora,
      datasets: [{
        label: 'Historial de ingresos',
        data: usuariosFormateados.map(usuario => usuario.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const chart = new Chart("ingresos", {
      type: 'line' as ChartType,
      data: data,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) => {
                const usuario = usuariosFormateados[tooltipItem.dataIndex];
                return `Usuario: ${usuario.usuario}, Ingresos: ${usuario.count}`;
              }
            }
          }
        },
        // ... otras opciones
      }
    });
  }
  
  
  
  cambiar(pdf:boolean){
    this.cargarPdf = pdf;
    if(pdf){
      this.cargarDias();
      this.contarTurnosPorEspecialidad();
      this.contarTurnosSolicitadosPorFecha();
      this.contarTurnosFinalizadosPorFecha();
      this.grafico();
      this.grafico1();
      this.grafico2();
      this.grafico3();
      this.grafico4();
    }
  }

  evaluarFechas(dia1:number,mes1:number,anio1:number,dia2:number,mes2:number,anio2:number){
    if(dia1 == dia2 && mes1 == mes2 && anio1 == anio2){
      return "iguales";
    }
    if(anio1 > anio2){
      return "mayor";
    }
    else if(anio1 == anio2 && mes1 > mes2){
      return "mayor";
    }
    else if(anio1 == anio2 && mes1 == mes2 && dia1 > dia2){
      return "mayor";
    }
    return "menor";
  }

  grafico2(){
    const ctx = new Chart("dia", {
      type: 'doughnut',
      data: {
        labels: this.dias,
        datasets: [{
          label: 'Turnos',
          data: this.diasPorTurno,
          borderWidth: 1,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
        }]
      },
      options: {
       
      }
    });
  }

  grafico3(){
    const ctx = new Chart("solicitados", {
      type: 'bar',
      data: {
        labels: this.especialistasNombres,
        datasets: [{
          label: 'Turnos',
          data: this.turnosSolicitadosPorFecha,
          borderWidth: 1,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  grafico4(){
    const ctx = new Chart("finalizados", {
      type: 'bar',
      data: {
        labels: this.especialistasNombres,
        datasets: [{
          label: 'Turnos',
          data: this.turnosFinalizadosPorFecha,
          borderWidth: 1,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  exportExcel(){
    let element = document.getElementById('logIngresos');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'estadisticas.xlsx');
  }

  async capturarGraficoComoImagen(chartId: string): Promise<string> {
    const chartElement = document.getElementById(chartId);

    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      return canvas.toDataURL('image/png');
    }

    return '';
  }

  async agregarGraficoAlPdf(pdf: PdfMakeWrapper, chartId: string, titulo: string): Promise<void> {
    const imagenBase64 = await this.capturarGraficoComoImagen(chartId);
    const logo = await new Img(imagenBase64).absolutePosition(30,20).fit([40,40]).build();
    if (imagenBase64) {
      pdf.add([
        logo,
        new Txt(titulo).fontSize(14).bold().margin([0, 0, 0, 10]),

      ]
      );
    }
  }
  obtenerImagenesBase64DeCanvas(): Promise<string[]> {
    const imagenesBase64: string[] = [];
  
    this.canvasElements.forEach(canvasElementRef => {
      const canvasElement = canvasElementRef.nativeElement;
      const imagenBase64 = canvasElement.toDataURL('image/png');
      imagenesBase64.push(imagenBase64);
    });
  
    return Promise.resolve(imagenesBase64);
  }
  async imprimirPdf() {
    const pdf = new PdfMakeWrapper();
    PdfMakeWrapper.setFonts(pdfFonts);
    const logo = await new Img('../../../assets/logo.png').absolutePosition(30,20).fit([40,40]).build();
    const imagenesBase64 = await this.obtenerImagenesBase64DeCanvas();
    pdf.add([logo, new Txt('Clinica OnLine').color('gray').absolutePosition(73,35).fontSize(15).italics().end]);
    pdf.add('\n');
    pdf.add(new Txt('Estadisticas').decoration('underline').alignment('center').fontSize(20).bold().end);
    let hoy = new Date();
    pdf.add(new Txt(['', new Txt('Fecha: ').bold().end, ' ', hoy.getDate().toString(), '/', (hoy.getMonth() + 1).toString(), '/', hoy.getFullYear().toString()]).end);
    const grafico1 = await new Img(imagenesBase64[0]).absolutePosition(170,120).fit([350, 350]).build();
    pdf.add(new Txt('Historial ingresos').alignment('center').fontSize(15).bold().end);
    pdf.add(grafico1);
    pdf.add(new Txt('Cantidad de turnos por especialidad').absolutePosition(25,320).fontSize(15).bold().end);
    const grafico2 = await new Img(imagenesBase64[1]).absolutePosition(25,350).fit([200, 200]).build();
    pdf.add(grafico2);
    pdf.add(new Txt('Cantidad de turnos por día').absolutePosition(350,320).fontSize(15).bold().end);
    const grafico3 = await new Img(imagenesBase64[2]).absolutePosition(350,350).fit([200, 200]).build();
    pdf.add(grafico3);
    pdf.add(new Txt('Turnos Solicitados').absolutePosition(25,620).fontSize(15).bold().end);
    const grafico4 = await new Img(imagenesBase64[3]).absolutePosition(25,650).fit([250, 250]).build();
    pdf.add(grafico4);
    pdf.add(new Txt('Turnos Finalizados').absolutePosition(350,620).fontSize(15).bold().end);
    const grafico5 = await new Img(imagenesBase64[4]).absolutePosition(350,650).fit([250, 250]).build();
    pdf.add(grafico5);
  
  
    pdf.create().download('estadisticas.pdf');
    pdf.create().open();
  }
  
  
  
}
