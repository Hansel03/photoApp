import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-subir',
  templateUrl: './subir.page.html',
  styleUrls: ['./subir.page.scss'],
})
export class SubirPage implements OnInit {
  titulo = new FormControl();
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };
  imagenPreview: string;

  constructor(
    private modalController: ModalController,
    private camera: Camera
  ) {}

  ngOnInit() {}

  public cerrarModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  public mostrarCamara() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        // Handle error
        console.error('Error en camara', JSON.stringify(err));
      }
    );
  }
}
