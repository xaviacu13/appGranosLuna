import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ItemRegistro } from '../../models/item-registro';
@Injectable({
  providedIn: 'root'
})
export class ItemRegistroService {

  itemRegistroList: AngularFireList<any>;
  selectedItemRegistro: ItemRegistro = new ItemRegistro();

  constructor(private firebase: AngularFireDatabase) { }

  Suma(a: number, b: number) {

    return a + b;
  }

  getItemRegistro() {
    return this.itemRegistroList = this.firebase.list('itemRegistro');
  }
  insertItemRegistro(itemRegistro: ItemRegistro) {

    this.itemRegistroList.push({
      idRegistro: itemRegistro.idRegistro || null || undefined,
      prenda: itemRegistro.prenda || null || undefined,
      cantidad: itemRegistro.cantidad || null || undefined,
      costoUnitario: itemRegistro.costoUnitario || null || undefined,
      costoTotal: itemRegistro.costoTotal || null || undefined,
      modelo: itemRegistro.modelo || null || undefined,
      color: itemRegistro.color || null || undefined,
    })
  }
  updateItemRegistro(itemRegistro: ItemRegistro) {
    this.itemRegistroList.update(itemRegistro.$key, {
      idRegistro: itemRegistro.idRegistro,
      prenda: itemRegistro.prenda,
      cantidad: itemRegistro.cantidad,
      costoUnitario: itemRegistro.costoUnitario,
      costoTotal: itemRegistro.costoTotal = itemRegistro.cantidad * itemRegistro.costoUnitario,
      modelo: itemRegistro.modelo || null,
      color: itemRegistro.color || null,
      // logoBordado:itemRegistro.logoBordado|| null,
      // descripcion:itemRegistro.descripcion|| null,
    })
  }
  deleteItemRegistro($key: string) {
    this.itemRegistroList.remove($key);
  }
}
