import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  ImagePicker,
  ImagePickerOptions,
} from '@ionic-native/image-picker/ngx';
import { CargaArchivoService } from '../services/carga-archivo.service';

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
  imagen64: string;

  constructor(
    private modalController: ModalController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private cargaArchivoService: CargaArchivoService
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
        this.imagen64 = imageData;
      },
      (err) => {
        // Handle error
        console.error('Error en camara', JSON.stringify(err));
      }
    );
  }

  public seleccionarFoto() {
    const opciones: ImagePickerOptions = {
      quality: 100,
      outputType: 1,
      maximumImagesCount: 1,
    };

    this.imagePicker.getPictures(opciones).then(
      (results) => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64 = results[i];
        }
      },
      (err) => {
        console.error('ERROR en selector', JSON.stringify(err));
      }
    );
  }

  public crearPost() {
    const archivo = {
      img: this.imagen64,
      titulo: this.titulo,
    };

    this.cargaArchivoService.cargarImagenFirebase(archivo);
  }
}
