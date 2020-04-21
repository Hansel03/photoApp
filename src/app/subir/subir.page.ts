import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-subir',
  templateUrl: './subir.page.html',
  styleUrls: ['./subir.page.scss'],
})
export class SubirPage implements OnInit {
  titulo = new FormControl();
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  public cerrarModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
