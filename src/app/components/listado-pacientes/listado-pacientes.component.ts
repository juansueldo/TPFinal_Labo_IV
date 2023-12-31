import { Component, EventEmitter, Output } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.models';
import { Turno } from 'src/app/models/turno.models';
import { DataService } from 'src/app/services/data.service';
import { PacienteService } from 'src/app/services/paciente.service';
import * as XLSX from 'xlsx';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent {
  pacientes : Array<Paciente> = [];
  mostrarTabla: boolean = false;
  mostrarBotonContainer: boolean = true;
  mensajeBoton: string = "Mostrar Listado";
  @Output() selectedPacienteEvent = new EventEmitter<Paciente>();

  constructor(private pacienteService : PacienteService, private data: DataService,private usuarioSerice: UsuariosService) {
  }
  ngOnInit(): void {
    this.pacienteService.obtenerPacientes().subscribe(res=>{
      console.log(res);
      this.pacientes = res;
    })
  } 
  toggleContenedor() {
    this.mostrarTabla = !this.mostrarTabla;
    this.mostrarBotonContainer = !this.mostrarBotonContainer;
    this.mensajeBoton = this.mostrarTabla ? "Mostrar Botones" : "Mostrar Listado";
  }
  onClick(paciente: any) {

    this.selectedPacienteEvent.emit(paciente);    
  }
  exportarExcel() {
    this.exportToExcel(this.pacientes, 'pacientes');
  }
  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  handleExcelTurnosPaciente(paciente: any) {
    this.exportarDatosPaciente(paciente)
      .subscribe(turnosTomados => {
          
        const mesesNumeros = {
          'Enero': 1,
          'Febrero': 2,
          'Marzo': 3,
          'Abril': 4,
          'Mayo': 5,
          'Junio': 6,
          'Julio': 7,
          'Agosto': 8,
          'Septiembre': 9,
          'Octubre': 10,
          'Noviembre': 11,
          'Diciembre': 12
        };
        const turnosFormateados = turnosTomados.map(turno => {
          const especialista = this.usuarioSerice.buscarUsuarioPorMail(turno.especialista);
          return {
            fechadelturno: `${turno.dia}/${mesesNumeros[turno.mes]}/${turno.anio} ${turno.hora}`,
            especialista: `${especialista.nombre} ${especialista.apellido} `,
            especialidad: turno.especialidad,
            comentarios: turno.comentario,
            estado: turno.estado,
            resenia: turno.resenia,
            calificacion: turno.calificacion,

          };
        });
        this.exportToExcel(turnosFormateados, `turnos_${paciente.nombre}_${paciente.apellido}` );
      });
  }
  
  exportarDatosPaciente(paciente): Observable<Turno[]> {
    return this.data.getTurnosDB().pipe(
      switchMap(turnos => {
        const turnosTomados = turnos.filter(turno => turno.paciente === paciente.email);
        return of(turnosTomados);
      })
    );
  }
  
  excelTurnosPaciente(paciente) {
    this.exportarDatosPaciente(paciente)
      .subscribe(turnosTomados => {
        this.exportToExcel(turnosTomados, "turnosPaciente");
      });
  }
}
