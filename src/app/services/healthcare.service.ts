import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class HealthcareService {

  constructor( private angularFire: AngularFirestore) { }

  getHealthcare() {
    return this.angularFire.collection('obrasocial').valueChanges();
  }
}
