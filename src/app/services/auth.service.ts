import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';
import {
  collection,
  addDoc,
  collectionData,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
} from '@angular/fire/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getAuth, updateProfile} from "firebase/auth"; 
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 

  constructor(private auth: Auth, private db: AngularFirestore) {}


  register(email:any, password: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login( email: any, password : any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

  saveLog(email : string){
    let date = new Date();
    const fullDate = date.toLocaleDateString() + '-' + date.toLocaleTimeString();
   
    let logs = this.db.collection('usuarios');
    logs.doc().set({
      email: email,
      fecha_ingreso: fullDate
    })

  }
  updateUser(user: any){
    const auth = getAuth();
    return updateProfile(auth.currentUser!, user)
  }
 
}