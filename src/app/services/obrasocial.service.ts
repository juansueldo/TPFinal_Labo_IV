import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class ObrasocialService {
  constructor( private angularFire: AngularFirestore) { }

  obtenerObrasSociales() {
    return this.angularFire.collection('obrasocial').valueChanges();
  }
}
