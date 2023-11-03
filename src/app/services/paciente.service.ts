import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc  } from '@angular/fire/firestore';
import { Paciente } from '../models/paciente.models';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pacienteRef = collection(this.firestore, 'pacientes')

  constructor(private firestore : Firestore, private angularFire: AngularFirestore) { }

  agregarPaciente(paciente: Paciente){
    return addDoc(this.pacienteRef, paciente);
  }

  obtenerPacientes(): Observable<Paciente[]> {
    return this.angularFire.collection<Paciente>('pacientes', ref => ref.orderBy('dni', 'asc')).valueChanges();
  }
}
