import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Insumo } from '../../models/insumo';
import { Almacen } from '../../models/almacen';
@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  insumoList: AngularFireList<any>;
  almacenList: AngularFireList<any>;
  selectedInsumo: Insumo = new Insumo();
  selectedAlamacen: Almacen = new Almacen();

  constructor(private firebase: AngularFireDatabase) { }

  getInsumo() {
    return this.insumoList = this.firebase.list('Insumo');
  }

  insertInsumo(insumo: Insumo) {
    this.insumoList.push({
      detalle: insumo.detalle,
      unidadMedida: insumo.unidadMedida,
      color: insumo.color,
      imagen: insumo.imagen,
      obs: insumo.obs || null,
    })
  }

  updateInsumo(insumo?: Insumo) {
    this.insumoList.update(insumo.$key, {
      detalle: insumo.detalle,
      unidadMedida: insumo.unidadMedida,
      color: insumo.color,
      imagen: insumo.imagen,
      obs: insumo.obs || null,
    });
  }

  deleteInsumo($key: string) {
    this.insumoList.remove($key);
  }
}