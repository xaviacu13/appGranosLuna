import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caja'
})
export class CajaPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    if (value != undefined) {
      const resultCaja = [];
      for (const valorCaja of value) {
        if ((valorCaja.glosa.toLowerCase().indexOf(arg) && valorCaja.personal.toLowerCase().indexOf(arg)) > -1) {
          resultCaja.push(valorCaja);
        };
      };
      return resultCaja;
    }
  }

}
