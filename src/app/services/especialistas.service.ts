import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, doc, setDoc  } from '@angular/fire/firestore';
import { Especialista } from '../models/especialista.models';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {
  especialisteRef = collection(this.firestore, 'especialistas')

  constructor(private firestore : Firestore, private angularFire: AngularFirestore) { }

  agregarEspecialista(especialista: Especialista){
    let col = collection(this.firestore, 'especialistas');
    let doucumento = doc(col, especialista.id);
    setDoc(doucumento, especialista).then(() => {
      console.log('Documento guardado con éxito en el ID del especialista:', especialista.id);
    })
    .catch((error) => {
      console.error('Error al guardar el documento:', error);
    });
  }

  obtenerEspecialistas(): Observable<Especialista[]> {
    return this.angularFire.collection<Especialista>('especialistas', ref => ref.orderBy('dni', 'asc')).valueChanges();
  }
  actualizarEspecialista(especialista:Especialista){
    let col = collection(this.firestore, 'especialistas');
    const documento = doc(col, especialista.id);
    updateDoc(documento, {
      estados: especialista.estados,
    });
  }
}
