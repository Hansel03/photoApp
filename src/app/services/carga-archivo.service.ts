import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { FormControl } from '@angular/forms';

interface ArchivoSubir {
  titulo: FormControl;
  img: string;
  key?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CargaArchivoService {
  constructor(
    private angularFirestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  cargarImagenFirebase(archivo: ArchivoSubir) {
    let promesa = new Promise((resolve, reject) => {
      this.mostrarToast('Cargando...');

      const storeRef = firebase.storage().ref();
      const nombreArchivo: string = new Date().valueOf().toString();

      const uploadTask: firebase.storage.UploadTask = storeRef
        .child(`img/${nombreArchivo}`)
        .putString(archivo.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {}, //saber el % dcuantos Mbs se han subido
        (error) => {
          //manejo de error
          console.log('ERROR EN LA CARGA', JSON.stringify(error));
          this.mostrarToast(JSON.stringify(error));
          reject();
        },
        () => {
          //todo bien
          console.log('Archivo subido');
          this.mostrarToast('Imagen cargada correctamente');
          resolve();
        }
      );
    });

    return promesa;
  }

  public async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
