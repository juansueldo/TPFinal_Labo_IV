import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc  } from '@angular/fire/firestore';
import { Specialist } from '../models/specialist';
import { Observable } from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  specialistRef = collection(this.firestore, 'especialista')

  constructor(private firestore : Firestore, private angularFire: AngularFirestore) { }

  addSpecialist(specialist: Specialist){
    return addDoc(this.specialistRef, specialist);
  }

  getSpecialist(): Observable<Specialist[]> {
    return this.angularFire.collection<Specialist>('especialista', ref => ref.orderBy('dni', 'asc')).valueChanges();
  }
}
