import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubirPage } from '../subir/subir.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Observable<any>;
  constructor(
    private modalController: ModalController,
    firestore: AngularFirestore
  ) {
    this.items = firestore.collection('post').valueChanges();
  }

  public async mostrarModal() {
    const modal = await this.modalController.create({
      component: SubirPage,
    });
    return await modal.present();
  }
}
