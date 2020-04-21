import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirPageRoutingModule } from './subir-routing.module';

import { SubirPage } from './subir.page';
import { PlaceHolderPipe } from '../place-holder.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SubirPage, PlaceHolderPipe],
})
export class SubirPageModule {}
