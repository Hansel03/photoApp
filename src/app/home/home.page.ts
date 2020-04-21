import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubirPage } from '../subir/subir.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private modalController: ModalController) {}

  public async mostrarModal() {
    const modal = await this.modalController.create({
      component: SubirPage,
    });
    return await modal.present();
  }
}
