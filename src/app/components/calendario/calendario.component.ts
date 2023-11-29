import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
  now: Date = new Date();
  dia: string = this.now.getDate().toString();
  mes: number = this.now.getMonth() + 1;
  anio: number = this.now.getFullYear();
  hora: number = this.now.getHours();
  restarDia = false;
  sumarDia = true;
  mostrarCalendario: string[][] = [];
  diaElegido: Date;

  @Output() diaEmitter: EventEmitter<Date> = new EventEmitter();

  ngOnInit(): void {
    this.cargarCalendario(this.mes, this.anio);
  }

  cargarCalendario(mes: number, anioActual: number) {
    this.mostrarCalendario = [];
    let fechaAux = new Date(anioActual, mes - 1, 1); 
    let fechaNumero = 1;

    for (let i = 0; i < 5; i++) {
      let semana = [];
      for (let j = 0; j < 7; j++) {
        if (i == 0 && fechaAux.getDay() <= j) {
          fechaAux.setDate(fechaNumero);
          semana.push(fechaAux.getDate());
          fechaNumero++;
        } else if (i == 0) {
          semana.push(" ");
        } else if (i != 0 && fechaNumero <= this.diasEnMes(mes, anioActual)) {
          fechaAux.setDate(fechaNumero);
          semana.push(fechaAux.getDate());
          fechaNumero++;
        }
      }
      this.mostrarCalendario.push(semana);
    }
  }

  diasEnMes(mes: number, anio: number): number {
    return new Date(anio, mes, 0).getDate();
  }

  elegirDia(dia: string) {
    this.diaElegido = new Date(this.anio, this.mes - 1, Number(dia));
    this.diaEmitter.emit(this.diaElegido);
  }

  cambiarMes(cuando: string) {
    if (cuando == "antes") {
      this.mes--;
      if (this.mes < 1) {
        this.mes = 12;
        this.anio = (Number(this.anio) - 1);
      }
    } else {
      this.mes++;
      if (this.mes > 12) {
        this.mes = 1;
        this.anio = (Number(this.anio) + 1);
      }
    }
    this.cargarCalendario(this.mes, this.anio);
  }
}