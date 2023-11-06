import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, doc, setDoc  } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Turno } from '../models/turno.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  especialisteRef = collection(this.firestore, 'turnos');
  constructor( private firestore : Firestore, private angularFire: AngularFirestore) { }

  agregarTurno(turno: Turno){
    let col = collection(this.firestore, 'turnos');
    let doucumento = doc(col, turno.id);
    setDoc(doucumento, turno).then(() => {
      console.log('Documento guardado con éxito en el ID del especialista:', turno.id);
    })
    .catch((error) => {
      console.error('Error al guardar el documento:', error);
    });
  }

  obtenerTurnos(): Observable<Turno[]> {
    return this.angularFire.collection<Turno>('especialistas', ref => ref.orderBy('dni', 'asc')).valueChanges();
  }
  actualizarTurno(turno:Turno){
    let col = collection(this.firestore, 'especialistas');
    const documento = doc(col, turno.id);
    updateDoc(documento, {
      
    });
  }
}
