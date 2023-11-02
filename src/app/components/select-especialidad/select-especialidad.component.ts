import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Especialidad } from 'src/app/models/interfaces.models';
@Component({
  selector: 'app-select-especialidad',
  templateUrl: './select-especialidad.component.html',
  styleUrls: ['./select-especialidad.component.scss']
})
export class SelectEspecialidadComponent {
  @Input() selectedItems: any[] = [];
  @Output() itemSelected = new EventEmitter<any[]>();

  especialidades: Especialidad[] = [];
  newItem: any = '';

  constructor(private especialidadService: EspecialidadesService) {

    this.selectedItems = [];
  }

  ngOnInit() {
    this.especialidadService.obtenerEspecialidades().subscribe((data: any[]) => {
      this.especialidades = data.map(especialidad => especialidad.nombre);
    });
  }

  addItem() {
    if (this.newItem && !this.especialidades.includes(this.newItem)) {
      this.especialidadService.agregarEspecialidad(this.newItem).then(() => {
        this.especialidades.push(this.newItem);
        this.selectedItems.push(this.newItem);
        this.newItem = '';
        this.itemSelected.emit(this.selectedItems);
      });
    } else if (this.newItem) {
      this.selectedItems.push(this.newItem);
      this.newItem = '';
      this.itemSelected.emit(this.selectedItems);
    }
  }
  removeItem(index: number) {
    this.selectedItems.splice(index, 1);
  }
}