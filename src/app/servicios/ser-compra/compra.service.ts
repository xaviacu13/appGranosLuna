import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Compra } from '../../models/compra';
@Injectable({
  providedIn: 'root'
})
export class CompraService {
  compraList: AngularFireList<any>;
  selectedCompra: Compra = new Compra();

  constructor(private firebase: AngularFireDatabase) { }



  getCompra() {
    return this.compraList = this.firebase.list('compra');
  }
  insertCompra(compra?: Compra) {
    this.compraList.push({
      descripcion: compra.descripcion,
      proveedor: compra.proveedor,
      personal: compra.personal,
      cantidad: compra.cantidad,
      consentracion: compra.consentracion,
      precioUnitario: compra.precioUnitario,
      precioTotal: compra.precioTotal = compra.cantidad * compra.precioUnitario,
      marca: compra.marca || null,
      fecha: compra.fecha,
    })
  }
  updateCompra(compra: Compra) {
    this.compraList.update(compra.$key, {
      descripcion: compra.descripcion,
      proveedor: compra.proveedor,
      personal: compra.personal,
      cantidad: compra.cantidad,
      consentracion: compra.consentracion,
      precioUnitario: compra.precioUnitario,
      precioTotal: compra.precioTotal = compra.cantidad * compra.precioUnitario,
      marca: compra.marca || null,
      fecha: compra.fecha,
    });
  }
  deleteCompra($key: string) {
    this.compraList.remove($key);
  }


}
