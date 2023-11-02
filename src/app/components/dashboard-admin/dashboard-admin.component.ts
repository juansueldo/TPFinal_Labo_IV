import { Component, Input, OnInit } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent{
  @Input() listaEspecialistas: Especialista[] 

}
