import { Component, EventEmitter, Output } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.models';
import { Turno } from 'src/app/models/turno.models';
import { DataService } from 'src/app/services/data.service';
import { PacienteService } from 'src/app/services/paciente.service';
import * as XLSX from 'xlsx';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent {
  pacientes : Array<Paciente> = [];
 
  @Output() selectedPacienteEvent = new EventEmitter<Paciente>();

  constructor(private pacienteService : PacienteService, private data: DataService) {
  }
  ngOnInit(): void {
    this.pacienteService.obtenerPacientes().subscribe(res=>{
      console.log(res);
      this.pacientes = res;
    })
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
        this.exportToExcel(turnosTomados, "turnosPaciente");
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
