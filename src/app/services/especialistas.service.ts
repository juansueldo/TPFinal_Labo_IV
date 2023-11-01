import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc  } from '@angular/fire/firestore';
import { Especialista } from '../models/especialista.models';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {
  especialisteRef = collection(this.firestore, 'especialista')

  constructor(private firestore : Firestore, private angularFire: AngularFirestore) { }

  agregarEspecialista(especialista: Especialista){
    return addDoc(this.especialisteRef, especialista);
  }

  obtenerEspecialistas(): Observable<Especialista[]> {
    return this.angularFire.collection<Especialista>('especialista', ref => ref.orderBy('dni', 'asc')).valueChanges();
  }
}
