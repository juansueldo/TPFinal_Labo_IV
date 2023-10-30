import { Injectable } from '@angular/core';
import { Observable, finalize, last, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, uploadString } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class ImgService {
   constructor(private storage: AngularFireStorage) { }

  // Método para subir una imagen a Firebase Cloud Storage
  uploadImage(file: File, path: string): Observable<string> {
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    // Devuelve un Observable que escucha los cambios en el estado de carga
    return task.snapshotChanges().pipe(
      // Espera a que la carga esté completa
      last(),
      // Obtiene la URL de descarga de la imagen
      switchMap(() => fileRef.getDownloadURL())
    );
  }
}
