import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Cotizacion } from '../../models/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  cotizacionList: AngularFireList<any>;
  selectedCotizacion: Cotizacion = new Cotizacion();

  constructor(private firebase: AngularFireDatabase) { }

  getCotizacion() {
    return this.cotizacionList = this.firebase.list('cotizacion');
  }
  insertCotizacion(cedula: any, llavePrenda:any, cantidad:any) {
    this.cotizacionList.push({
      cedula: cedula,
      llavePrenda: llavePrenda,
      cantidad: cantidad
    })
  }
  updateCotizacion(cotizacion: Cotizacion) {
    this.cotizacionList.update(cotizacion.$key, {
      cedula: cotizacion.cedula,
      llavePrenda: cotizacion.llavePrenda,
      cantidad: cotizacion.cantidad
    });
  }
  
  deleteCotizacion($key: string) {
    this.cotizacionList.remove($key);
  }
}
