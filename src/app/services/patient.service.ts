import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc  } from '@angular/fire/firestore';
import { Patient } from '../models/patient.models';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  repartidorRef = collection(this.firestore, 'paciente')

  constructor(private firestore : Firestore, private angularFire: AngularFirestore) { }

  addPatient(repartidor: Patient){
    return addDoc(this.repartidorRef, repartidor);
  }

  getPatients(): Observable<Patient[]> {
    return this.angularFire.collection<Patient>('paciente', ref => ref.orderBy('dni', 'asc')).valueChanges();
  }
}
