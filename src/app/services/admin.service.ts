import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, doc, setDoc  } from '@angular/fire/firestore';
import { Admin } from '../models/admin.models';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  especialisteRef = collection(this.firestore, 'administradores')

  constructor(private firestore : Firestore, private angularFire: AngularFirestore) { }

  agregarAdmin(especialista: Admin){
    let doucumento = doc(this.especialisteRef, especialista.id);
    setDoc(doucumento, especialista).then(() => {
      console.log('Documento guardado con éxito en el ID del especialista:', especialista.id);
    })
    .catch((error) => {
      console.error('Error al guardar el documento:', error);
    });
  }

  obtenerAdmins(): Observable<Admin[]> {
    return this.angularFire.collection<Admin>('administradores', ref => ref.orderBy('dni', 'asc')).valueChanges();
  }
  
}
