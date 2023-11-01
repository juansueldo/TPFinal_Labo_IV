import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  constructor( private angularFire: AngularFirestore) { }

  agregarEspecialidad(nombre: string) {
    return this.angularFire.collection('especialidades').add({ nombre });
  }
  obtenerEspecialidades() {
    return this.angularFire.collection('especialidades').valueChanges();
  }
}

