import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  constructor( private angularFire: AngularFirestore) { }

  obtenerEspecialidades() {
    return this.angularFire.collection('especialidad').valueChanges();
  }
}

