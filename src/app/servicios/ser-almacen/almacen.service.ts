import { Injectable } from '@angular/core';
import { Almacen } from 'src/app/models/almacen';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { totalmem } from 'os';
import { AlmacenComponent } from 'src/app/componentes/almacen/almacen.component';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  almacenList: AngularFireList<any>;
  selectedAlmacen: Almacen = new Almacen();

  constructor(private firebase: AngularFireDatabase) { }



  getAlmacen() {
    return this.almacenList = this.firebase.list('almacen');
  }

  insertAlmacen(almacen: Almacen, des?: string, ent?: any, sal?: any, tot?: any, est?: string) {
    // almacen.descripcion=almacen.descripcion.toUpperCase();

    if (almacen == null) {
      this.almacenList.push({
        descripcion: des,
        entrada: ent || null,
        salida: sal || null,
        total: tot = ent - sal || null,
        estado: est || null,
      });
    } else {
      this.almacenList.push({
        descripcion: almacen.descripcion,
        entrada: almacen.entrada || null,
        salida: almacen.salida || null,
        total: almacen.total = almacen.entrada - almacen.salida || null,
        estado: almacen.estado || null,
      });
    }
  }

  updateAlmacen(almacen: any) {

    this.almacenList.update(almacen.$key, {
      descripcion: almacen.descripcion,
      entrada: almacen.entrada,
      salida: almacen.salida,
      total: almacen.total,
      estado: almacen.estado,
    });
  }
  deleteAlmacen($key: string) {
    this.almacenList.remove($key);
  }


}
