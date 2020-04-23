import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CargaArchivoService {
  imagenes: ArchivoSubir[] = [];
  constructor(
    private angularFirestore: AngularFirestore,
    private toastController: ToastController,
    private storage: AngularFireStorage
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

          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const url = downloadURL;
            this.crearPost(archivo.titulo, url);
          });

          resolve();
        }
      );
    });

    return promesa;
  }

  private crearPost(title: string, url: string) {
    const post: ArchivoSubir = {
      img: url,
      titulo: title,
    };

    console.log(JSON.stringify(post));

    //insertar objeto en angularFirestore
    this.angularFirestore.collection('post').add(post);
    this.imagenes.push(post);
  }

  public async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
}
