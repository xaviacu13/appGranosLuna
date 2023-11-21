import { Injectable } from '@angular/core';
import { Caja } from 'src/app/models/caja';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { totalmem } from 'os';


@Injectable({
  providedIn: 'root'
})
export class CajaService {
  cajaList: AngularFireList<any>;
  selectedCaja: Caja = new Caja();

  constructor(private firebase: AngularFireDatabase) { }
  getCaja() {
    return this.cajaList = this.firebase.list('caja');
  }
  insertCaja(caja?: Caja, fecha?: any, glosa?: any, entradaCaja?: any, salidaCaja?: any, personal?: any) {

    if (caja === null || caja === undefined) {
      // console.log(fecha);
      // console.log(glosa);
      // console.log(entradaCaja);
      // console.log(salidaCaja);
      // console.log(personal);
      this.cajaList.push({
        ingreso: entradaCaja || null,
        salida: salidaCaja || null,
        glosa: glosa || null,
        fecha: fecha || null,
        personal: personal || null,
      })
    } else {
      this.cajaList.push({
        ingreso: caja.ingreso || null,
        salida: caja.salida || null,
        glosa: caja.glosa,
        fecha: caja.fecha,
        personal: caja.personal,
      })
    }

  }
  updateCaja(caja?: Caja, fecha?: any, glosa?: any, salidaCaja?: any, personal?: any) {
    if (caja === null || caja === undefined) {
      this.cajaList.update(caja.$key, {
        ingreso: '' || null,
        salida: salidaCaja || null,
        glosa: glosa,
        fecha: fecha,
        personal: personal,
      });
    } else {
      this.cajaList.update(caja.$key, {
        ingreso: caja.ingreso || null,
        salida: caja.salida || null,
        glosa: caja.glosa,
        fecha: caja.fecha,
        personal: caja.personal,
      });
    }
  }


  deleteCaja($key: string) {
    this.cajaList.remove($key);
  }


}

