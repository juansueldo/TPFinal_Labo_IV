import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  constructor( private angularFire: AngularFirestore) { }

  getSpecialty() {
    return this.angularFire.collection('especialidad').valueChanges();
  }
}
