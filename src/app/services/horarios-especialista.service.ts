import { Injectable } from '@angular/core';
import { HorarioEspecialista } from '../models/horario-especialista.models';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, doc, setDoc  } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorariosEspecialistaService {

  constructor(private firestore : Firestore, private angularFire: AngularFirestore) { }
  getHorarioEspecialistas(): Observable<HorarioEspecialista[]>{
    let col = collection(this.firestore, 'horarioEspecialistas');
    return collectionData(col, { idField: 'id'}) as Observable<HorarioEspecialista[]>;
  }
  cargarHorarioEspecialistas(horarioEsp:HorarioEspecialista){
    let col = collection(this.firestore, 'horarioEspecialistas');
    addDoc(col, Object.assign({}, horarioEsp));
  }
  updateHorarioEspecialistas(horarioEsp:HorarioEspecialista){
    let col = collection(this.firestore, 'horarioEspecialistas');
    const documento = doc(col, horarioEsp.id);
    updateDoc(documento, {
      lunInicio: horarioEsp.lunInicio,
      lunFin: horarioEsp.lunFin,
      marInicio: horarioEsp.marInicio,
      marFin: horarioEsp.marFin,
      mierInicio: horarioEsp.mierInicio,
      mierFin: horarioEsp.mierFin,
      jueInicio: horarioEsp.jueInicio,
      jueFin: horarioEsp.jueFin,
      vierInicio: horarioEsp.vierInicio,
      vierFin: horarioEsp.vierFin,
      sabInicio: horarioEsp.sabInicio,
      sabFin: horarioEsp.sabFin,
      estados: horarioEsp.estados,
      especialidadesPorDia: horarioEsp.especialidadesPorDia,
    });
  }
}
