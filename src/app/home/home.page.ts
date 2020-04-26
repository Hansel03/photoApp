import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubirPage } from '../subir/subir.page';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { CargaArchivoService } from '../services/carga-archivo.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // items: Observable<any>;
  @ViewChild(IonInfiniteScroll, { static: true })
  hayMas: boolean;
  infiniteScroll: IonInfiniteScroll;
  constructor(
    private modalController: ModalController,
    // private firestore: AngularFirestore
    private cargaArchivoService: CargaArchivoService,
    private socialSharing: SocialSharing
  ) {
    // this.items = firestore.collection('post').valueChanges();
  }

  public async mostrarModal() {
    const modal = await this.modalController.create({
      component: SubirPage,
    });
    return await modal.present();
  }

  public loadData(event) {
    // setTimeout(() => {
    //   console.log('Done');
    //   event.target.complete();

    //   // App logic to determine if all data is loaded
    //   // and disable the infinite scroll
    //   if (data.length == 1000) {
    //     event.target.disabled = true;
    //   }
    // }, 500);

    this.cargaArchivoService.cargarImagenes().then((hayMas: boolean) => {
      console.log('hay mas? ' + hayMas);
      this.hayMas = hayMas;
      event.target.complete();
      // event.target.disabled = true;
    });
  }

  public compartir(post: any) {
    // Share via facebok
    this.socialSharing
      .shareViaFacebook(post.titulo, post.img, post.img)
      .then(() => {
        // Success!
        console.log('compartido por facebook');
      })
      .catch(() => {
        // Error!
        console.log('NO compartido por facebook');
      });
  }
}
