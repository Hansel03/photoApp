import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/internal/operators';

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CargaArchivoService {
  public imagenes: ArchivoSubir[] = [];
  lastKey: string = null;
  constructor(
    private angularFirestore: AngularFirestore,
    private toastController: ToastController
  ) {
    this.cargarUltimoKey().subscribe(() => {
      this.cargarImagenes();
    });
  }

  private cargarUltimoKey() {
    return this.angularFirestore
      .collection('post', (ref) => ref.orderBy('img').limitToLast(1))
      .valueChanges({ idField: 'key' })
      .pipe(
        map((post: any) => {
          console.log(post);
          this.lastKey = post[0].img;
          this.imagenes.push(post[0]);
        })
      );
  }

  /**
   *Funcion encargada de cargar imagenes por grtupos
   *
   * @memberof CargaArchivoService
   */
  cargarImagenes() {
    return new Promise((resolve, reject) => {
      this.angularFirestore
        .collection('post', (ref) =>
          ref.limitToLast(3).orderBy('img').endAt(this.lastKey)
        )
        .valueChanges()
        .subscribe((posts: any) => {
          posts.pop(); //eliminamos el ultimo elemento del array
          if (posts.length === 0) {
            console.log('Ya no hay mas registros');
            resolve(false);
            return;
          }
          //si llega aqui quiere deir que aun hay registros
          this.lastKey = posts[0].img;

          for (let i = posts.length - 1; i >= 0; i--) {
            const post = posts[i];
            this.imagenes.push(post);
          }
          resolve(true);
        });
    });
  }

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
