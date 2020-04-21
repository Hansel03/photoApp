import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder',
})
export class PlaceHolderPipe implements PipeTransform {
  transform(value: any, defecto: string = 'Crear post'): string {
    if (value) {
      return value;
    } else {
      return defecto;
    }
  }
}
